// src/routers/quizRouters.js
import express from 'express';
// Cập nhật import để bao gồm cả hàm lưu kết quả và lấy tất cả kết quả
import { generateAiQuizForTopic, saveQuizResult, getAllQuizResults } from '../controllers/quizControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route để LẤY TẤT CẢ KẾT QUẢ quiz (với filter và pagination)
// Endpoint: GET /api/quizzes/results
router.get('/results', protect, getAllQuizResults);

// Route để TẠO quiz bằng AI cho một Topic cụ thể
// Endpoint: GET /api/quizzes/:topicId/ai-quiz
router.get('/:topicId/ai-quiz', protect, generateAiQuizForTopic);

// Route để LƯU KẾT QUẢ của quiz
// Endpoint: POST /api/quizzes/:topicId/submit
router.post('/:topicId/submit', protect, saveQuizResult);

export default router;
