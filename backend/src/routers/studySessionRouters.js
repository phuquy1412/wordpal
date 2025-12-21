import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
    startStudySession,
    processCardReview,
    endStudySession
} from '../controllers/studySessionControllers.js';

const router = express.Router();

// Protect all routes with authentication middleware
router.use(protect);

// @route   POST /api/study-sessions/start
// @desc    Initialize a new study session
// @access  Private
router.post('/start', startStudySession);

// @route   POST /api/study-sessions/:sessionId/review
// @desc    Process a single flashcard review within a study session
// @access  Private
router.post('/:sessionId/review', processCardReview);

// @route   POST /api/study-sessions/:sessionId/end
// @desc    End a study session and update user statistics
// @access  Private
router.post('/:sessionId/end', endStudySession);

export default router;