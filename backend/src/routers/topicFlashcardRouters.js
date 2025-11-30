import express from 'express';
import {
    createFlashcard,
    getFlashcardsByTopic
} from '../../controllers/flashcard/flashcardControllers.js';
import { protect } from '../../middlewares/authMiddleware.js';

// Kích hoạt mergeParams để có thể truy cập params từ router cha (vd: :topicId)
const router = express.Router({ mergeParams: true });

// @route   /api/topics/:topicId/flashcards

// Lấy tất cả flashcard của một topic & tạo một flashcard mới cho topic đó
router.route('/')
    // Yêu cầu đăng nhập để xem, controller sẽ kiểm tra quyền cụ thể
    .get(protect, getFlashcardsByTopic)
    // Yêu cầu đăng nhập và là chủ sở hữu topic để tạo
    .post(protect, createFlashcard);

export default router;
