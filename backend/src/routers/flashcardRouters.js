import express from 'express';
import {
    updateFlashcard,
    deleteFlashcard
} from '../../controllers/flashcard/flashcardControllers.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

// @route   /api/flashcards

router.route('/:id')
    // Cập nhật một flashcard (yêu cầu đăng nhập và là chủ sở hữu)
    .put(protect, updateFlashcard)
    // Xóa một flashcard (yêu cầu đăng nhập và là chủ sở hữu)
    .delete(protect, deleteFlashcard);

export default router;
