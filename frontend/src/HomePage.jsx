import React, { useState } from 'react';
import { Search, BookOpen, Users, TrendingUp, Menu, X, Plus, Star, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";


export default function QuizletHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Sample data
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

  const features = [
    { icon: BookOpen, title: 'Flashcards', desc: 'Học với thẻ ghi nhớ hiệu quả' },
    { icon: Users, title: 'Học cùng nhau', desc: 'Tham gia lớp học và chia sẻ' },
    { icon: TrendingUp, title: 'Theo dõi tiến độ', desc: 'Xem kết quả học tập của bạn' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">StudyHub</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">Trang chủ</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">Thư viện</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">Lớp học</a>
              <button 
                    onClick={() => navigate("/login")}          
                    className="px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-medium transition">
                Đăng nhập
              </button>
              <button 
                onClick={() => navigate("/signup")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
                Đăng ký
              </button>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 space-y-3 border-t">
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Trang chủ</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Thư viện</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Lớp học</a>
              <button className="w-full px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                Đăng nhập
              </button>
              <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Đăng ký
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
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

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm bộ thẻ, chủ đề..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg shadow-lg"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Study Sets */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Học gần đây</h2>
              <p className="text-gray-600">Tiếp tục với những bộ thẻ bạn đang học</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Tạo bộ thẻ mới</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentSets.map((set) => (
              <div key={set.id} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-transparent hover:border-blue-300 transition cursor-pointer">
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
            ))}
          </div>
        </div>
      </section>

      {/* Popular Sets */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Phổ biến nhất</h2>
            <p className="text-gray-600">Các bộ thẻ được yêu thích nhất tuần này</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {popularSets.map((set) => (
              <div key={set.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-blue-200">
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu học?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Tham gia cùng hàng triệu học sinh trên toàn thế giới
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold text-lg transition shadow-lg">
            Đăng ký miễn phí ngay
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Về chúng tôi</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Giới thiệu</a></li>
                <li><a href="#" className="hover:text-white transition">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white transition">Tuyển dụng</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Sản phẩm</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Flashcards</a></li>
                <li><a href="#" className="hover:text-white transition">Học tập</a></li>
                <li><a href="#" className="hover:text-white transition">Kiểm tra</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Hướng dẫn</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Kết nối</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 StudyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}