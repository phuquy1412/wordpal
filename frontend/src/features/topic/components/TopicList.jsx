import React from 'react';
import { BookOpen, Users, Star } from 'lucide-react';

// Component for a single topic card
const TopicCard = ({ topic, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border-2 border-transparent hover:border-blue-500"
      onClick={() => onSelect(topic)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{topic.description || 'Không có mô tả'}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>{topic.totalLearners || 0} người học</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{topic.averageRating || 'Chưa có'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// Component for a single topic row in list view
const TopicRow = ({ topic, onSelect }) => {
    return (
      <div
        className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
        onClick={() => onSelect(topic)}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{topic.name}</h3>
          <p className="text-sm text-gray-500">{topic.totalCards || 0} thẻ</p>
        </div>
        <div className="flex items-center text-sm text-gray-600 space-x-6">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{topic.totalLearners || 0}</span>
          </div>
          <p className="hidden md:block">{new Date(topic.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    );
  };

const TopicList = ({ topics, onSelectTopic, viewMode }) => {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(topic => (
          <TopicCard key={topic._id} topic={topic} onSelect={onSelectTopic} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topics.map(topic => (
        <TopicRow key={topic._id} topic={topic} onSelect={onSelectTopic} />
      ))}
    </div>
  );
};

export default TopicList;
