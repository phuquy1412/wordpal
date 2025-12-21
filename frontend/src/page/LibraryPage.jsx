import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LibraryPage = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Chức năng đang xây dựng</h1>
        <p>Trang Thư viện (Library) hiện chưa khả dụng. Vui lòng quay lại sau.</p>
      </div>
      <Footer />
    </div>
  );
};

export default LibraryPage;