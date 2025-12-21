// frontend/src/page/StatisticsPage.jsx
import React, { useState, useEffect } from 'react';
import statisticsApi from '../features/statistics/api/statisticsApi';
import OverallStatsCard from '../features/statistics/components/OverallStatsCard';
import DailyProgressChart from '../features/statistics/components/DailyProgressChart';
import FlashcardProgressList from '../features/statistics/components/FlashcardProgressList';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an AuthContext

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
                const [overall, daily, progress] = await Promise.all([
                    statisticsApi.getOverallStats(),
                    statisticsApi.getDailyStats(),
                    statisticsApi.getFlashcardProgress()
                ]);
                setOverallStats(overall);
                setDailyStats(daily);
                setFlashcardProgress(progress);
                setLoading(false);
            } catch (err) {
                console.error("Lỗi khi tải thống kê:", err);
                setError("Không thể tải dữ liệu thống kê. Vui lòng thử lại sau.");
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [user]); // Re-fetch if user changes (e.g., login/logout)

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-700">Đang tải thống kê...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Thống kê học tập của bạn</h1>
            
            <OverallStatsCard stats={overallStats} />
            <DailyProgressChart dailyStats={dailyStats} />
            <FlashcardProgressList progressData={flashcardProgress} />
            
            {/* You could add a StudySessionsSummary component here if desired */}
        </div>
    );
};

export default StatisticsPage;