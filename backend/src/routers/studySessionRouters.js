import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
    startStudySession,
    processCardReview,
    endStudySession,
    createSummaryStudySession
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

// @route   POST /api/study-sessions/summary
// @desc    Create a summary study session from frontend data
// @access  Private
router.post('/summary', createSummaryStudySession);

export default router;