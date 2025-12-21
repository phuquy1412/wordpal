import Flashcard from '../model/Flashcard.js';
import UserProgress from '../model/UserProgress.js';
import StudySession from '../model/StudySession.js';
import UserStatistics from '../model/UserStatistics.js';
import Topic from '../model/Topic.js';
import mongoose from 'mongoose';

// Helper function for SRS (SuperMemo 2 algorithm simplified)
const calculateSRS = (easeFactor, interval, repetitions, quality) => {
    // Quality: 0 (bad, forgot) to 5 (perfect)
    if (quality < 3) { // If answer was incorrect or hard
        repetitions = 0;
        interval = 1;
        easeFactor = Math.max(1.3, easeFactor - 0.2);
    } else { // Correct answer
        repetitions += 1;
        easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (repetitions === 1) {
            interval = 1;
        } else if (repetitions === 2) {
            interval = 6;
        } else {
            interval = Math.round(interval * easeFactor);
        }
    }
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    return { easeFactor, interval, repetitions, nextReviewDate };
};

/**
 * @desc    Initialize a new study session
 * @route   POST /api/study-sessions/start
 * @access  Private
 */
export const startStudySession = async (req, res) => {
    const { topicId } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(topicId)) {
        return res.status(400).json({ message: 'ID chủ đề không hợp lệ.' });
    }

    try {
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ message: 'Không tìm thấy chủ đề.' });
        }

        const newSession = new StudySession({
            user: userId,
            topic: topicId,
            startTime: new Date(),
            // Other fields will be updated during/after the session
        });

        await newSession.save();
        res.status(201).json(newSession);

    } catch (error) {
        console.error(`Lỗi khi bắt đầu phiên học: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi bắt đầu phiên học.' });
    }
};

/**
 * @desc    Process a single flashcard review within a study session
 * @route   POST /api/study-sessions/:sessionId/review
 * @access  Private
 * @body    { flashcardId, quality (0-5), timeSpent (seconds) }
 */
export const processCardReview = async (req, res) => {
    const { sessionId } = req.params;
    const { flashcardId, quality, timeSpent } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(sessionId) || !mongoose.Types.ObjectId.isValid(flashcardId)) {
        return res.status(400).json({ message: 'ID phiên học hoặc ID flashcard không hợp lệ.' });
    }
    if (quality === undefined || quality < 0 || quality > 5) {
        return res.status(400).json({ message: 'Chất lượng phản hồi (quality) phải từ 0 đến 5.' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const studySession = await StudySession.findById(sessionId).session(session);
        if (!studySession || studySession.user.toString() !== userId.toString()) {
            await session.abortTransaction();
            return res.status(404).json({ message: 'Không tìm thấy phiên học hoặc bạn không có quyền truy cập.' });
        }

        // 1. Update UserProgress for the flashcard
        let userProgress = await UserProgress.findOne({ user: userId, flashcard: flashcardId }).session(session);

        if (!userProgress) {
            // If it's the first time user interacts with this flashcard
            userProgress = new UserProgress({
                user: userId,
                flashcard: flashcardId,
                topic: studySession.topic, // Inherit topic from study session
            });
        }

        // Update correct/incorrect counts
        if (quality >= 3) {
            userProgress.correctCount += 1;
        } else {
            userProgress.incorrectCount += 1;
        }
        userProgress.totalReviews += 1;

        // Apply SRS algorithm
        const { easeFactor, interval, repetitions, nextReviewDate } = calculateSRS(
            userProgress.easeFactor,
            userProgress.interval,
            userProgress.repetitions,
            quality
        );

        userProgress.easeFactor = easeFactor;
        userProgress.interval = interval;
        userProgress.repetitions = repetitions;
        userProgress.nextReviewDate = nextReviewDate;
        userProgress.lastReviewDate = new Date();
        userProgress.status = repetitions === 0 ? 'learning' : (interval > 30 ? 'mastered' : 'reviewing'); // Simplified status update

        await userProgress.save({ session });

        // 2. Update StudySession details
        studySession.cardsStudied += 1;
        if (quality >= 3) {
            studySession.cardsCorrect += 1;
        } else {
            studySession.cardsIncorrect += 1;
        }
        studySession.reviews.push({ flashcard: flashcardId, quality, timeSpent, timestamp: new Date() });
        // completionRate will be calculated at the end of the session

        await studySession.save({ session });

        await session.commitTransaction();
        res.status(200).json({ message: 'Phản hồi flashcard đã được xử lý.', userProgress, studySession });

    } catch (error) {
        await session.abortTransaction();
        console.error(`Lỗi khi xử lý phản hồi flashcard: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi xử lý phản hồi flashcard.' });
    } finally {
        session.endSession();
    }
};


/**
 * @desc    End a study session and update user statistics
 * @route   POST /api/study-sessions/:sessionId/end
 * @access  Private
 */
export const endStudySession = async (req, res) => {
    const { sessionId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
        return res.status(400).json({ message: 'ID phiên học không hợp lệ.' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const studySession = await StudySession.findById(sessionId).session(session);
        if (!studySession || studySession.user.toString() !== userId.toString()) {
            await session.abortTransaction();
            return res.status(404).json({ message: 'Không tìm thấy phiên học hoặc bạn không có quyền truy cập.' });
        }

        // Finalize StudySession
        studySession.endTime = new Date();
        studySession.duration = Math.round((studySession.endTime - studySession.startTime) / 1000); // Duration in seconds
        
        // Ensure completionRate is calculated correctly (e.g., based on number of cards reviewed vs available cards)
        // For simplicity, let's say it's 1 if any cards were studied
        studySession.completionRate = studySession.cardsStudied > 0 ? 1 : 0; 
        
        await studySession.save({ session });

        // 2. Update UserStatistics
        let userStats = await UserStatistics.findOne({ user: userId }).session(session);

        if (!userStats) {
            userStats = new UserStatistics({ user: userId });
        }

        userStats.totalStudySessions += 1;
        userStats.totalStudyTime += studySession.duration;
        userStats.totalCardsReviewed += studySession.cardsStudied;
        userStats.totalCorrectAnswers += studySession.cardsCorrect;
        
        // Recalculate average accuracy
        if (userStats.totalCardsReviewed > 0) {
            userStats.averageAccuracy = (userStats.totalCorrectAnswers / userStats.totalCardsReviewed) * 100;
        } else {
            userStats.averageAccuracy = 0;
        }

        // Streak logic (simplified)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for comparison
        
        const lastStudy = userStats.lastStudyDate ? new Date(userStats.lastStudyDate) : null;
        if (lastStudy) lastStudy.setHours(0, 0, 0, 0);

        if (lastStudy && lastStudy.getTime() === today.getTime()) {
            // Already studied today, no change to streak
        } else if (lastStudy && (today.getTime() - lastStudy.getTime() === 24 * 60 * 60 * 1000)) {
            // Studied yesterday, continue streak
            userStats.currentStreak += 1;
        } else {
            // Not studied yesterday or first session, reset streak
            userStats.currentStreak = 1;
        }
        userStats.longestStreak = Math.max(userStats.longestStreak, userStats.currentStreak);
        userStats.lastStudyDate = new Date(); // Update to current date

        // Update dailyStats
        const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
        let dailyStat = userStats.dailyStats.find(d => new Date(d.date).toISOString().split('T')[0] === todayStr);

        if (dailyStat) {
            dailyStat.cardsStudied += studySession.cardsStudied;
            dailyStat.studyTime += studySession.duration;
            // Re-calculate accuracy for the day
            const totalDailyCards = dailyStat.cardsStudied; // This is actually total studied for the day
            const totalDailyCorrect = dailyStat.studyTime; // Placeholder, need actual daily correct count
            // This accuracy calculation needs more thought or a different way to track daily correct answers
            // For now, let's keep it simple: if daily stat existed, update
            // Otherwise, we'll need to aggregate more carefully.
            // For simplicity in this example, just update the existing one.
            // A more robust solution would aggregate from UserProgress for the day.
            dailyStat.accuracy = (userStats.totalCorrectAnswers / userStats.totalCardsReviewed) * 100; // Use overall accuracy for now
        } else {
            userStats.dailyStats.push({
                date: today,
                cardsStudied: studySession.cardsStudied,
                studyTime: studySession.duration,
                accuracy: (studySession.cardsCorrect / studySession.cardsStudied) * 100 // Accuracy for this specific session
            });
            // Keep dailyStats array to max 30 entries (or similar)
            if (userStats.dailyStats.length > 30) {
                userStats.dailyStats.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
                userStats.dailyStats = userStats.dailyStats.slice(userStats.dailyStats.length - 30); // Keep last 30
            }
        }
        
        // Increment totalTopics and totalFlashcards if this is the first time for user
        const userTopics = await StudySession.distinct('topic', { user: userId }).session(session);
        userStats.totalTopics = userTopics.length;
        
        // This is tricky: totalFlashcards is usually 'unique flashcards mastered/studied'.
        // For now, just rely on totalCardsReviewed as a proxy.
        // Or aggregate from UserProgress distinct flashcards.
        const userFlashcards = await UserProgress.distinct('flashcard', { user: userId }).session(session);
        userStats.totalFlashcards = userFlashcards.length;


        await userStats.save({ session });

        await session.commitTransaction();
        res.status(200).json({ message: 'Phiên học đã kết thúc và thống kê đã được cập nhật.', studySession, userStats });

    } catch (error) {
        await session.abortTransaction();
        console.error(`Lỗi khi kết thúc phiên học: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi kết thúc phiên học.' });
    } finally {
        session.endSession();
    }
};

