// src/features/topic-detail/components/TopicInfoHeader.jsx
import React from 'react';
import { BookOpen, User, Tag, Clock, Star } from 'lucide-react';

const formatDateTime = (dateString) => {
  if (!dateString) return "Không rõ";
  const date = new Date(dateString);

  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

const TopicInfoHeader = ({ topic, onStudyClick }) => {
  if (!topic) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">{topic?.name || "Chủ đề không có tên"}</h1>
          <p className="text-blue-100 max-w-3xl">{topic.description}</p>
        </div>
        <div className="mt-6 md:mt-0 flex-shrink-0">
          <button
            onClick={onStudyClick}
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-gray-100 transition-all"
          >
            Học ngay
          </button>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-blue-500/50 flex flex-wrap gap-x-8 gap-y-4 text-blue-100">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Tạo bởi <strong>{topic?.author?.name || "Không rõ"}</strong></span>
        </div>
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5" />
          <span>{topic.totalCards} thẻ</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>{formatDateTime(topic.createdAt)}</span>
        </div>
        {topic.isFavorite && (
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span>Yêu thích</span>
          </div>
        )}
      </div>

      {topic.tags && topic.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {topic.tags.map(tag => (
            <span key={tag} className="bg-blue-500/50 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicInfoHeader;
