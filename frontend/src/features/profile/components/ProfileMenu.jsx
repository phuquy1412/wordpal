import React from 'react';
import { TrendingUp, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfileMenu() {
  return (
    <>
      <Link to="/statistics" className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition text-gray-700 hover:bg-gray-50">
        <TrendingUp className="w-5 h-5" />
        <span className="font-medium">Thống kê</span>
      </Link>
      <Link to="/notifications" className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition text-gray-700 hover:bg-gray-50">
        <Bell className="w-5 h-5" />
        <span className="font-medium">Thông báo</span>
      </Link>
    </>
  );
}
