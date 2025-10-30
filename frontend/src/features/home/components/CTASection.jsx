import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Sẵn sàng bắt đầu học?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Tham gia cùng hàng triệu học sinh trên toàn thế giới
        </p>
        <button 
          onClick={() => navigate('/signup')}
          className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold text-lg transition shadow-lg">
          Đăng ký miễn phí ngay
        </button>
      </div>
    </section>
  );
}