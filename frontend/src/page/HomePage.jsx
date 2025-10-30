import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import RecentSets from '../components/home/RecentSets';
import PopularSets from '../components/home/PopularSets';
import CTASection from '../components/home/CTASection';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - Sau này sẽ fetch từ API
  const recentSets = [
    { id: 1, title: 'English Vocabulary - Unit 5', terms: 45, author: 'Nguyễn Văn A', progress: 75 },
    { id: 2, title: 'Lịch Sử Việt Nam', terms: 30, author: 'Trần Thị B', progress: 50 },
    { id: 3, title: 'Mathematical Formulas', terms: 60, author: 'Lê Văn C', progress: 90 },
  ];

  const popularSets = [
    { id: 4, title: 'IELTS Speaking Topics', terms: 100, users: 5420, rating: 4.8 },
    { id: 5, title: 'JavaScript ES6+', terms: 80, users: 3200, rating: 4.9 },
    { id: 6, title: 'Biology Chapter 10', terms: 55, users: 2800, rating: 4.7 },
  ];

  const handleCreateNewSet = () => {
    // TODO: Navigate to create set page
    console.log('Create new set');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <RecentSets sets={recentSets} onCreateNew={handleCreateNewSet} />
      <PopularSets sets={popularSets} />
      <CTASection />
      <Footer />
    </div>
  );
}