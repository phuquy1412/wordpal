import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
    getOverallStats,
    getDailyStats,
    getFlashcardProgress,
    getStudySessionsSummary
} from '../controllers/statisticsControllers.js';

const router = express.Router();

// Protect all routes with authentication middleware
router.use(protect);

// @route   GET /api/statistics/overall
// @desc    Get overall statistics for the authenticated user
// @access  Private
router.get('/overall', getOverallStats);

// @route   GET /api/statistics/daily
// @desc    Get daily statistics for the authenticated user
// @access  Private
router.get('/daily', getDailyStats);

// @route   GET /api/statistics/flashcard-progress
// @desc    Get detailed progress for all flashcards of a user
// @access  Private
router.get('/flashcard-progress', getFlashcardProgress);

// @route   GET /api/statistics/sessions
// @desc    Get a summary of study sessions for the authenticated user
// @access  Private
router.get('/sessions', getStudySessionsSummary);

export default router;