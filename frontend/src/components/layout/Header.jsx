import React, { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileNav from './MobileNav';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
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
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Trang chủ
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Thư viện
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Lớp học
            </a>
            <button 
              onClick={() => navigate('/login')}          
              className="px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-medium transition">
              Đăng nhập
            </button>
            <button 
              onClick={() => navigate('/signup')}
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
        <MobileNav isOpen={isMenuOpen} onNavigate={navigate} />
      </div>
    </header>
  );
}