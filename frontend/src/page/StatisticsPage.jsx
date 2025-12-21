import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800">Tính năng đang được phát triển</h2>
          <p className="mt-2 text-gray-600">Trang thống kê sẽ sớm được ra mắt. Vui lòng quay lại sau!</p>
          <Link to="/profile" className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Trở về Profile
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
