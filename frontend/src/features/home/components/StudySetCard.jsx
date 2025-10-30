import React from 'react';
import { Clock } from 'lucide-react';

export default function StudySetCard({ set }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-transparent hover:border-blue-300 transition cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{set.title}</h3>
          <p className="text-sm text-gray-600">{set.terms} thuật ngữ</p>
        </div>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Tiến độ</span>
          <span className="font-semibold text-blue-600">{set.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
            style={{ width: `${set.progress}%` }}
          ></div>
        </div>
      </div>
      <p className="text-sm text-gray-500">Bởi {set.author}</p>
    </div>
  );
}