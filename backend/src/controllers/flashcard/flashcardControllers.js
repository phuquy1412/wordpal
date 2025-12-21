import Flashcard from '../../model/Flashcard.js';
import Topic from '../../model/Topic.js';
import UserProgress from '../../model/UserProgress.js';
import mongoose from 'mongoose';

/**
 * @desc    Tạo một flashcard mới cho một topic
 * @route   POST /api/topics/:topicId/flashcards
 * @access  Private
 */
export const createFlashcard = async (req, res) => {
    const { id: topicId } = req.params;
    const { front, back, pronunciation, example, difficulty } = req.body;

    if (!front || !back) {
        return res.status(400).json({ message: 'Mặt trước và mặt sau của thẻ không được để trống' });
    }
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
        return res.status(400).json({ message: 'ID topic không hợp lệ' });
    }

    try {
        const topic = await Topic.findById(topicId);

        if (!topic) {
            return res.status(404).json({ message: 'Không tìm thấy topic' });
        }

        // Chỉ người tạo topic mới có quyền thêm flashcard
        if (topic.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Bạn không có quyền thêm flashcard vào topic này' });
        }

        const flashcard = new Flashcard({
            topic: topicId,
            creator: req.user._id,
            front,
            back,
            pronunciation,
            example,
            difficulty: difficulty || undefined // Only set if provided, otherwise default will apply
        });

        // Sử dụng transaction để đảm bảo cả hai thao tác đều thành công
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const createdFlashcard = await flashcard.save({ session });
            
            // Tăng số lượng thẻ trong topic
            topic.totalCards += 1;
            await topic.save({ session });

            await session.commitTransaction();
            res.status(201).json(createdFlashcard);
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    } catch (error) {
        console.error(`Lỗi khi tạo flashcard: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi tạo flashcard.' });
    }
};

/**
 * @desc    Lấy tất cả flashcard của một topic
 * @route   GET /api/topics/:topicId/flashcards
 * @access  Public (nếu topic public) / Private (nếu là của người tạo)
 */
export const getFlashcardsByTopic = async (req, res) => {
    const { id: topicId } = req.params;
    console.log("Backend Flashcard Controller: Received request for topicId:", topicId); // DEBUGGING
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20; // Mặc định 20 thẻ mỗi trang
    const skip = (page - 1) * limit;

    if (!mongoose.Types.ObjectId.isValid(topicId)) {
        console.error("Backend Flashcard Controller: Invalid topicId format detected."); // DEBUGGING
        return res.status(400).json({ message: 'ID topic không hợp lệ' });
    }

    try {
        const topic = await Topic.findById(topicId).lean(); // Dùng lean để đọc nhanh hơn

        if (!topic) {
            return res.status(404).json({ message: 'Không tìm thấy topic' });
        }

        // Nếu topic không public, chỉ người tạo mới có quyền xem
        if (!topic.isPublic && (!req.user || topic.creator.toString() !== req.user._id.toString())) {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập bộ thẻ này' });
        }
        
        const flashcards = await Flashcard.find({ topic: topicId })
            .sort({ createdAt: 1 }) // Sắp xếp theo thứ tự tạo
            .skip(skip)
            .limit(limit)
            .lean();
            
        const totalFlashcards = await Flashcard.countDocuments({ topic: topicId });

        res.json({
            flashcards,
            currentPage: page,
            totalPages: Math.ceil(totalFlashcards / limit),
            totalFlashcards,
        });

    } catch (error) {
        console.error(`Lỗi khi lấy danh sách flashcard: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách flashcard.' });
    }
};

/**
 * @desc    Cập nhật một flashcard
 * @route   PUT /api/flashcards/:id
 * @access  Private
 */
export const updateFlashcard = async (req, res) => {
    const { id: flashcardId } = req.params;
    const { front, back, pronunciation, example } = req.body;

    if (!mongoose.Types.ObjectId.isValid(flashcardId)) {
        return res.status(400).json({ message: 'ID flashcard không hợp lệ' });
    }

    try {
        const flashcard = await Flashcard.findById(flashcardId);

        if (!flashcard) {
            return res.status(404).json({ message: 'Không tìm thấy flashcard' });
        }

        // Chỉ người tạo mới có quyền sửa
        if (flashcard.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa thẻ này' });
        }

        flashcard.front = front || flashcard.front;
        flashcard.back = back || flashcard.back;
        flashcard.pronunciation = pronunciation || flashcard.pronunciation;
        flashcard.example = example || flashcard.example;

        const updatedFlashcard = await flashcard.save();
        res.json(updatedFlashcard);

    } catch (error) {
        console.error(`Lỗi khi cập nhật flashcard: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi cập nhật flashcard.' });
    }
};

/**
 * @desc    Xóa một flashcard
 * @route   DELETE /api/flashcards/:id
 * @access  Private
 */
export const deleteFlashcard = async (req, res) => {
    const { id: flashcardId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(flashcardId)) {
        return res.status(400).json({ message: 'ID flashcard không hợp lệ' });
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const flashcard = await Flashcard.findById(flashcardId).session(session);

        if (!flashcard) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Không tìm thấy flashcard' });
        }

        // Chỉ người tạo mới có quyền xóa
        if (flashcard.creator.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ message: 'Bạn không có quyền xóa thẻ này' });
        }

        // 1. Xóa flashcard
        await Flashcard.deleteOne({ _id: flashcardId }, { session });
        
        // 2. Giảm số lượng thẻ trong topic
        await Topic.findByIdAndUpdate(flashcard.topic, { $inc: { totalCards: -1 } }, { session });

        // 3. Xóa tất cả progress liên quan đến flashcard này
        await UserProgress.deleteMany({ flashcard: flashcardId }, { session });

        await session.commitTransaction();
        res.json({ message: 'Flashcard đã được xóa thành công' });

    } catch (error) {
        await session.abortTransaction();
        console.error(`Lỗi khi xóa flashcard: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi xóa flashcard.' });
    } finally {
        session.endSession();
    }
};
