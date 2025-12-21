// frontend/src/features/statistics/components/FlashcardProgressList.jsx
import React from 'react';

const FlashcardProgressList = ({ progressData }) => {
    if (!progressData || progressData.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tiến độ Flashcard</h2>
                <p className="text-gray-600">Không có dữ liệu tiến độ flashcard để hiển thị.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tiến độ Flashcard</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">Flashcard</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">Chủ đề</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">Đúng/Sai</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">Ôn tập tiếp theo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {progressData.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-900">
                                    {item.flashcard?.front || 'N/A'}
                                </td>
                                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-600">
                                    {item.topic?.name || 'N/A'}
                                </td>
                                <td className="py-3 px-4 border-b border-gray-200 text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        item.status === 'mastered' ? 'bg-green-100 text-green-800' :
                                        item.status === 'learning' ? 'bg-blue-100 text-blue-800' :
                                        item.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-900">
                                    {item.correctCount}/{item.correctCount + item.incorrectCount}
                                </td>
                                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-900">
                                    {item.nextReviewDate ? new Date(item.nextReviewDate).toLocaleDateString() : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FlashcardProgressList;
