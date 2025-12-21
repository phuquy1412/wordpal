import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Helper để lấy token từ localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Gọi API để tạo một bộ câu hỏi quiz bằng AI cho một chủ đề.
 * @param {string} topicId - ID của chủ đề.
 * @returns {Promise<object>} - Dữ liệu quiz bao gồm tiêu đề và mảng câu hỏi.
 */
export const generateAiQuiz = async (topicId) => {
    try {
        const response = await axios.get(`${API_URL}/quizzes/${topicId}/ai-quiz`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error generating AI quiz:', error.response?.data?.message || error.message);
        throw error.response?.data || new Error('Failed to generate AI quiz');
    }
};

/**
 * Gửi kết quả quiz lên server để lưu lại.
 * @param {string} topicId - ID của chủ đề.
 * @param {object} resultData - Dữ liệu kết quả quiz.
 * @param {number} resultData.score - Điểm số cuối cùng (ví dụ: 80).
 * @param {number} resultData.correctAnswers - Số câu trả lời đúng.
 * @param {number} resultData.totalQuestions - Tổng số câu hỏi.
 * @returns {Promise<object>} - Kết quả đã được lưu.
 */
export const submitQuizResult = async (topicId, resultData) => {
    try {
        const response = await axios.post(`${API_URL}/quizzes/${topicId}/submit`, resultData, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting quiz result:', error.response?.data?.message || error.message);
        throw error.response?.data || new Error('Failed to submit quiz result');
    }
};
