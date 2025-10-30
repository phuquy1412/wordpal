import React from 'react';
import PopularSetCard from './PopularSetCard';

export default function PopularSets({ sets }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Phổ biến nhất</h2>
          <p className="text-gray-600">Các bộ thẻ được yêu thích nhất tuần này</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sets.map((set) => (
            <PopularSetCard key={set.id} set={set} />
          ))}
        </div>
      </div>
    </section>
  );
}