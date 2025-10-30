import React from 'react';
import SearchBar from './SearchBar';
import FeatureCard from './FeatureCard';
import { BookOpen, Users, TrendingUp } from 'lucide-react';

export default function HeroSection({ searchQuery, onSearchChange }) {
  const features = [
    { icon: BookOpen, title: 'Flashcards', desc: 'Học với thẻ ghi nhớ hiệu quả' },
    { icon: Users, title: 'Học cùng nhau', desc: 'Tham gia lớp học và chia sẻ' },
    { icon: TrendingUp, title: 'Theo dõi tiến độ', desc: 'Xem kết quả học tập của bạn' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Học tập thông minh hơn,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            không vất vả hơn
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Hàng triệu học sinh và giáo viên tin tưởng sử dụng StudyHub để tạo flashcards, ôn tập và đạt mục tiêu học tập
        </p>

        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {features.map((feature, idx) => (
          <FeatureCard
            key={idx}
            icon={feature.icon}
            title={feature.title}
            description={feature.desc}
          />
        ))}
      </div>
    </section>
  );
}