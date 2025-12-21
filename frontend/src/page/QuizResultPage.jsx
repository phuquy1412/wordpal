import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { FaCheckCircle, FaStar, FaRedo } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';

const QuizResultPage = () => {
    const location = useLocation();
    // Dữ liệu kết quả có thể được truyền qua state khi điều hướng
    const resultFromState = location.state?.result;
    
    // Nếu không có state (ví dụ: người dùng tải lại trang), ta có thể hiển thị thông báo
    // Một phiên bản nâng cao có thể fetch dữ liệu từ API bằng `resultId` từ params
    const { resultId } = useParams();

    // Ưu tiên dữ liệu từ state, nếu không có thì hiển thị thông báo
    const result = resultFromState;

    if (!result) {
        return (
             <div className="flex flex-col min-h-screen bg-gray-50">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
                    <div className="text-center p-8 bg-white shadow-lg rounded-xl">
                        <h1 className="text-2xl font-bold text-gray-700">Không tìm thấy dữ liệu kết quả.</h1>
                        <p className="text-gray-500 mt-2">Có thể bạn đã tải lại trang. Vui lòng quay lại chủ đề để thử lại.</p>
                         <Link 
                            to="/library" // Quay về thư viện chung
                            className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                        >
                            <IoArrowBack className="mr-2" />
                            Quay về thư viện
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
    
    const { score, correctAnswers, totalQuestions, topic } = result;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-gray-200 text-center">
                    <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Hoàn thành!</h1>
                    <p className="text-gray-500 mb-6">Bạn đã hoàn thành bài luyện tập cho chủ đề này.</p>
                    
                    <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl p-6 mb-8">
                        <div className="flex justify-around items-center">
                            <div>
                                <p className="text-lg font-bold text-blue-900">{score}%</p>
                                <p className="text-sm text-blue-700">Điểm số</p>
                            </div>
                             <div className="border-l border-blue-200 h-12"></div>
                            <div>
                                <p className="text-lg font-bold text-blue-900">{correctAnswers}</p>
                                <p className="text-sm text-blue-700">Số câu đúng</p>
                            </div>
                             <div className="border-l border-blue-200 h-12"></div>
                            <div>
                                <p className="text-lg font-bold text-blue-900">{totalQuestions}</p>
                                <p className="text-sm text-blue-700">Tổng số câu</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link 
                            to={`/topics/${topic}/quiz`}
                            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <FaRedo className="mr-2" />
                            Làm lại
                        </Link>
                        <Link 
                            to={`/topic/${topic}`}
                            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                             <IoArrowBack className="mr-2" />
                            Quay về chủ đề
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default QuizResultPage;
