// frontend/src/page/StatisticsPage.jsx
import React, { useState, useEffect } from 'react';
import statisticsApi from '../features/statistics/api/statisticsApi';
import OverallStatsCard from '../features/statistics/components/OverallStatsCard';
import DailyProgressChart from '../features/statistics/components/DailyProgressChart';
import FlashcardProgressList from '../features/statistics/components/FlashcardProgressList';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an AuthContext
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const StatisticsPage = () => {
    const { user } = useAuth(); // Get user from context for authentication
    const [overallStats, setOverallStats] = useState(null);
    const [dailyStats, setDailyStats] = useState(null);
    const [flashcardProgress, setFlashcardProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            if (!user) { // Ensure user is authenticated
                setLoading(false);
                setError("Người dùng chưa đăng nhập.");
                return;
            }
            
            try {
                setLoading(true);
                setError(null); // Reset lỗi trước khi gọi API mới
                const [overall, daily, progress] = await Promise.all([
                    statisticsApi.getOverallStats(),
                    statisticsApi.getDailyStats(),
                    statisticsApi.getFlashcardProgress()
                ]);
                setOverallStats(overall);
                setDailyStats(daily);
                setFlashcardProgress(progress);
            } catch (err) {
                console.error("Lỗi khi tải thống kê:", err);
                setError("Không thể tải dữ liệu thống kê. Vui lòng thử lại sau.");
            } finally {
                setLoading(false); // Luôn tắt loading dù thành công hay thất bại
            }
        };

        fetchStatistics();
    }, [user]); // Re-fetch if user changes (e.g., login/logout)

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow flex flex-col">
                {loading ? (
                    <div className="flex-grow flex justify-center items-center">
                        <p className="text-xl text-gray-700">Đang tải thống kê...</p>
                    </div>
                ) : error ? (
                    <div className="flex-grow flex justify-center items-center">
                        <p className="text-xl text-red-500">{error}</p>
                    </div>
                ) : (
                    <div className="container mx-auto p-4 md:p-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Thống kê học tập của bạn</h1>
                        
                        {/* Thêm fallback || {} hoặc || [] để tránh lỗi crash nếu API trả về null */}
                        <OverallStatsCard stats={overallStats || {}} />
                        <DailyProgressChart dailyStats={dailyStats || []} />
                        <FlashcardProgressList progressData={flashcardProgress || []} />
                        
                        {/* You could add a StudySessionsSummary component here if desired */}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default StatisticsPage;