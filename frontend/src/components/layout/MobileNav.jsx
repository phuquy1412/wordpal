import React from 'react';
import { User, BookMarked, Settings, LogOut, Bell, Home, Book, Users } from 'lucide-react';

export default function MobileNav({ isOpen, onNavigate, isLoggedIn, user, onLogout }) {
  if (!isOpen) return null;

  return (
    <nav className="md:hidden py-4 space-y-2 border-t animate-fadeIn">
      {/* Main Navigation Links */}
      <button
        onClick={() => onNavigate('/')}
        className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
      >
        <Home className="w-5 h-5" />
        <span className="font-medium">Trang chủ</span>
      </button>

      <button
        onClick={() => onNavigate('/dictionary')}
        className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
      >
        <Book className="w-5 h-5" />
        <span className="font-medium">Tra từ</span>
      </button>

      <button
        onClick={() => onNavigate('/library')}
        className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
      >
        <BookMarked className="w-5 h-5" />
        <span className="font-medium">Thư viện</span>
      </button>

      <button
        onClick={() => onNavigate('/classes')}
        className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
      >
        <Users className="w-5 h-5" />
        <span className="font-medium">Lớp học</span>
      </button>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3"></div>

      {/* Auth Section */}
      {isLoggedIn ? (
        <>
          {/* User Info Card */}
          <div className="mx-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">
                  {user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">
                  {user?.username || 'User'}
                </p>
                <p className="text-xs text-gray-600 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* User Menu Items */}
          <button
            onClick={() => onNavigate('/profile')}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Trang cá nhân</span>
          </button>

          <button
            onClick={() => onNavigate('/my-sets')}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          >
            <BookMarked className="w-5 h-5" />
            <span className="font-medium">Bộ thẻ của tôi</span>
          </button>

          <button
            onClick={() => onNavigate('/notifications')}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="font-medium">Thông báo</span>
            <span className="absolute right-4 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button
            onClick={() => onNavigate('/settings')}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Cài đặt</span>
          </button>

          {/* Logout Divider */}
          <div className="border-t border-gray-200 my-3"></div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </>
      ) : (
        <>
          {/* Login & Register Buttons khi chưa đăng nhập */}
          <button 
            onClick={() => onNavigate('/login')}
            className="w-full px-6 py-3 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-all"
          >
            Đăng nhập
          </button>
          <button 
            onClick={() => onNavigate('/signup')}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Đăng ký miễn phí
          </button>
        </>
      )}
    </nav>
  );
}