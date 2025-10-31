import React from "react";
import { BookOpen, CheckCircle } from "lucide-react";

export default function AuthBranding() {
  return (
    <div className="hidden md:block space-y-6">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <span className="text-4xl font-bold text-gray-900">WordPal</span>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-900 leading-tight">
        Chào mừng
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-gray-600">
        Tiếp tục hành trình học tập của bạn với hàng triệu flashcards và bộ thẻ học tập
      </p>

      {/* Highlights */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-gray-700">Học mọi lúc, mọi nơi</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-gray-700">Theo dõi tiến độ học tập</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-gray-700">Chia sẻ với bạn bè</span>
        </div>
      </div>
    </div>
  );
}
