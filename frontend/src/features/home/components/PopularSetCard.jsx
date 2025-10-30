import React from 'react';
import { Star, Users, ChevronRight } from 'lucide-react';

export default function PopularSetCard({ set }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-blue-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{set.title}</h3>
        <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold text-gray-900">{set.rating}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{set.terms} thuật ngữ</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-1 text-gray-500">
          <Users className="w-4 h-4" />
          <span>{set.users.toLocaleString()} người học</span>
        </div>
        <ChevronRight className="w-5 h-5 text-blue-600" />
      </div>
    </div>
  );
}