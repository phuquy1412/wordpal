// frontend/src/features/statistics/components/OverallStatsCard.jsx
import React from 'react';

const OverallStatsCard = ({ stats }) => {
    // Helper to format time from seconds to H M S
    const formatTime = (totalSeconds) => {
        if (totalSeconds === undefined || totalSeconds === null) return '0 giây';
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        let timeString = '';
        if (hours > 0) timeString += `${hours} giờ `;
        if (minutes > 0) timeString += `${minutes} phút `;
        timeString += `${seconds} giây`;
        return timeString.trim();
    };

    const data = stats || {
        totalTopics: 0,
        totalFlashcards: 0,
        totalStudySessions: 0,
        totalStudyTime: 0,
        totalCardsReviewed: 0,
        totalCorrectAnswers: 0,
        averageAccuracy: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastStudyDate: null,
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Thống kê tổng quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatItem label="Tổng Chủ đề" value={data.totalTopics} />
                <StatItem label="Tổng Flashcard" value={data.totalFlashcards} />
                <StatItem label="Tổng Phiên học" value={data.totalStudySessions} />
                <StatItem label="Tổng Thời gian học" value={formatTime(data.totalStudyTime)} />
                <StatItem label="Thẻ đã ôn" value={data.totalCardsReviewed} />
                <StatItem label="Câu trả lời đúng" value={data.totalCorrectAnswers} />
                <StatItem label="Độ chính xác TB" value={`${data.averageAccuracy.toFixed(2)}%`} />
                <StatItem label="Chuỗi học hiện tại" value={`${data.currentStreak} ngày`} />
                <StatItem label="Chuỗi học dài nhất" value={`${data.longestStreak} ngày`} />
                <StatItem label="Ngày học gần nhất" value={data.lastStudyDate ? new Date(data.lastStudyDate).toLocaleDateString() : 'Chưa học'} />
            </div>
        </div>
    );
};

const StatItem = ({ label, value }) => (
    <div className="bg-gray-50 p-4 rounded-md">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
);

export default OverallStatsCard;
