import React from 'react';
import { Plus } from 'lucide-react';
import StudySetCard from './StudySetCard';

export default function RecentSets({ sets, onCreateNew }) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Học gần đây</h2>
            <p className="text-gray-600">Tiếp tục với những bộ thẻ bạn đang học</p>
          </div>
          <button 
            onClick={onCreateNew}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Tạo bộ thẻ mới</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sets.map((set) => (
            <StudySetCard key={set.id} set={set} />
          ))}
        </div>
      </div>
    </section>
  );
}
