// frontend/src/features/statistics/components/DailyProgressChart.jsx
import React from 'react';

const DailyProgressChart = ({ dailyStats }) => {
    // For now, this is a placeholder. A real chart would use a library like Chart.js or Recharts.

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tiến độ học tập hàng ngày</h2>
            {dailyStats && dailyStats.length > 0 ? (
                <div className="text-center text-gray-600 h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-lg">Biểu đồ tiến độ hàng ngày sẽ hiển thị ở đây.</p>
                    {/* Placeholder for actual chart component */}
                    {/* Example data point for demonstration: */}
                    {/* <div className="text-sm mt-2">
                        Dữ liệu mẫu: {dailyStats[dailyStats.length - 1]?.cardsStudied} thẻ đã học vào ngày {new Date(dailyStats[dailyStats.length - 1]?.date).toLocaleDateString()}
                    </div> */}
                </div>
            ) : (
                <p className="text-gray-600">Không có dữ liệu tiến độ hàng ngày để hiển thị.</p>
            )}
        </div>
    );
};

export default DailyProgressChart;
