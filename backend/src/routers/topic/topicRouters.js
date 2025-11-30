import express from 'express';
import {
    createTopic,
    getMyTopics,
    getPublicTopics,
    getTopicById,
    updateTopic,
    deleteTopic
} from '../../controllers/topic/topicControllers.js';
import { protect } from '../../middlewares/authMiddleware.js';
import topicFlashcardRouter from '../topicFlashcardRouters.js'; // Import router lồng nhau

const router = express.Router();

// @route   /api/topics

// Router lồng nhau cho flashcards
// Chuyển tất cả các request đến '/:id/flashcards' cho topicFlashcardRouter xử lý
router.use('/:id/flashcards', topicFlashcardRouter);

// Tạo một topic mới (yêu cầu đăng nhập)
router.post('/', protect, createTopic);

// Lấy tất cả các topic của người dùng hiện tại (yêu cầu đăng nhập)
router.get('/my-topics', protect, getMyTopics);

// Lấy tất cả các topic được công khai (không cần đăng nhập)
router.get('/public', getPublicTopics);

// Lấy, cập nhật, xóa một topic bằng ID
router.route('/:id')
    // Lấy chi tiết topic (yêu cầu đăng nhập, controller sẽ kiểm tra quyền xem)
    .get(protect, getTopicById)
    // Cập nhật topic (yêu cầu đăng nhập và là chủ sở hữu)
    .put(protect, updateTopic)
    // Xóa topic (yêu cầu đăng nhập và là chủ sở hữu)
    .delete(protect, deleteTopic);

export default router;