import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../features/quiz/hooks/useQuiz';
import QuizView from '../features/quiz/components/QuizView';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const QuizPage = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    
    // Sử dụng custom hook để quản lý toàn bộ logic quiz
    const { 
        quizData, 
        loading, 
        error, 
        quizCompleted, 
        finalResult,
        handleQuizComplete 
    } = useQuiz(topicId);

    // Xử lý khi quiz hoàn thành
    React.useEffect(() => {
        if (quizCompleted && finalResult) {
            // Chuyển hướng đến trang kết quả với ID của kết quả
            // State được dùng để truyền dữ liệu tạm thời qua cho trang mới
            navigate(`/quiz/result/${finalResult._id}`, { state: { result: finalResult } });
        }
    }, [quizCompleted, finalResult, navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                {error && (
                    <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg">
                        <h2 className="text-2xl font-bold mb-2">Đã có lỗi xảy ra</h2>
                        <p>{error.message || 'Không thể tải hoặc tạo quiz. Vui lòng thử lại.'}</p>
                    </div>
                )}
                
                {!error && (
                    <QuizView 
                        quizData={quizData}
                        loading={loading}
                        onQuizComplete={handleQuizComplete}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default QuizPage;
