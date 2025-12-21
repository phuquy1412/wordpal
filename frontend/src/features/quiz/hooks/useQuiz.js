import { useState, useEffect, useCallback } from 'react';
import { generateAiQuiz, submitQuizResult } from '../api/quizApi';

/**
 * Custom hook để quản lý trạng thái và logic của một phiên quiz.
 * @param {string} topicId - ID của chủ đề để tạo quiz.
 * @returns {object} - Trạng thái và các hàm xử lý cho quiz.
 */
export const useQuiz = (topicId) => {
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [finalResult, setFinalResult] = useState(null);

    // Fetch quiz questions when the hook is used
    useEffect(() => {
        if (!topicId) {
            setError(new Error("Topic ID is required."));
            setLoading(false);
            return;
        };

        const fetchQuiz = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await generateAiQuiz(topicId);
                setQuizData(data);
            } catch (err) {
                setError(err);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [topicId]);

    /**
     * Hàm được gọi khi quiz hoàn thành.
     * Nó sẽ gửi kết quả lên server và cập nhật trạng thái.
     * @param {object} result - Kết quả từ component QuizView.
     */
    const handleQuizComplete = useCallback(async (result) => {
        try {
            setLoading(true);
            setError(null);
            // Gửi kết quả lên server
            const savedResult = await submitQuizResult(topicId, result);
            setFinalResult(savedResult.result); // Lưu kết quả trả về từ server
            setQuizCompleted(true);
        } catch (err) {
            setError(err);
            console.error("Failed to submit quiz result:", err);
        } finally {
            setLoading(false);
        }
    }, [topicId]);

    return {
        quizData,       // Dữ liệu câu hỏi
        loading,        // Trạng thái đang tải
        error,          // Lỗi (nếu có)
        quizCompleted,  // Cờ báo hiệu quiz đã hoàn thành và đã gửi kết quả
        finalResult,    // Kết quả cuối cùng trả về từ server
        handleQuizComplete, // Hàm để xử lý khi quiz kết thúc
    };
};
