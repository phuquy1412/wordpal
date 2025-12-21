import UserStatistics from '../model/UserStatistics.js';
import UserProgress from '../model/UserProgress.js';
import StudySession from '../model/StudySession.js';
import mongoose from 'mongoose';

/**
 * @desc    Get overall statistics for the authenticated user
 * @route   GET /api/statistics/overall
 * @access  Private
 */
export const getOverallStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const stats = await UserStatistics.findOne({ user: userId });

        if (!stats) {
            // If no stats exist, return a default empty stats object
            return res.status(200).json({
                user: userId,
                totalTopics: 0,
                totalFlashcards: 0,
                totalStudySessions: 0,
                totalStudyTime: 0,
                totalCardsReviewed: 0,
                totalCorrectAnswers: 0,
                averageAccuracy: 0,
                currentStreak: 0,
                longestStreak: 0,
                lastStudyDate: null,
                achievements: [],
                dailyStats: []
            });
        }

        res.status(200).json(stats);

    } catch (error) {
        console.error(`Error fetching overall stats: ${error.message}`);
        res.status(500).json({ message: 'Server error while fetching overall statistics.' });
    }
};

/**
 * @desc    Get daily statistics for the authenticated user (e.g., last 30 days)
 * @route   GET /api/statistics/daily
 * @access  Private
 */
export const getDailyStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const stats = await UserStatistics.findOne({ user: userId }, 'dailyStats');

        if (!stats || !stats.dailyStats) {
            return res.status(200).json([]); // Return empty array if no daily stats
        }

        // Optional: Filter daily stats for a specific period if needed, or return all
        // For example, to get last 30 days:
        // const thirtyDaysAgo = new Date();
        // thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        // const filteredDailyStats = stats.dailyStats.filter(day => day.date >= thirtyDaysAgo);

        res.status(200).json(stats.dailyStats);

    } catch (error) {
        console.error(`Error fetching daily stats: ${error.message}`);
        res.status(500).json({ message: 'Server error while fetching daily statistics.' });
    }
};

/**
 * @desc    Get detailed progress for all flashcards of a user
 * @route   GET /api/statistics/flashcard-progress
 * @access  Private
 */
export const getFlashcardProgress = async (req, res) => {
    try {
        const userId = req.user._id;

        const progress = await UserProgress.find({ user: userId })
            .populate('flashcard', 'front back topic') // Populate flashcard details
            .populate('topic', 'name'); // Populate topic name

        res.status(200).json(progress);

    } catch (error) {
        console.error(`Error fetching flashcard progress: ${error.message}`);
        res.status(500).json({ message: 'Server error while fetching flashcard progress.' });
    }
};

/**
 * @desc    Get a summary of study sessions for the authenticated user
 * @route   GET /api/statistics/sessions
 * @access  Private
 */
export const getStudySessionsSummary = async (req, res) => {
    try {
        const userId = req.user._id;

        const sessions = await StudySession.find({ user: userId })
            .sort({ startTime: -1 }) // Newest sessions first
            .limit(10) // Get last 10 sessions for summary
            .populate('topic', 'name');

        res.status(200).json(sessions);

    } catch (error) {
        console.error(`Error fetching study session summary: ${error.message}`);
        res.status(500).json({ message: 'Server error while fetching study sessions summary.' });
    }
};
