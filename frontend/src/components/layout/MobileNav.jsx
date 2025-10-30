import React from 'react';

export default function MobileNav({ isOpen, onNavigate }) {
  if (!isOpen) return null;

  return (
    <nav className="md:hidden py-4 space-y-3 border-t">
      <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">
        Trang chủ
      </a>
      <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">
        Thư viện
      </a>
      <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">
        Lớp học
      </a>
      <button 
        onClick={() => onNavigate('/login')}
        className="w-full px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-medium">
        Đăng nhập
      </button>
      <button 
        onClick={() => onNavigate('/signup')}
        className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
        Đăng ký
      </button>
    </nav>
  );
}