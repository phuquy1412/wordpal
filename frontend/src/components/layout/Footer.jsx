import React from 'react';

export default function Footer() {
  const footerLinks = {
    about: [
      { label: 'Giới thiệu', href: '#' },
      { label: 'Liên hệ', href: '#' },
      { label: 'Tuyển dụng', href: '#' }
    ],
    product: [
      { label: 'Flashcards', href: '#' },
      { label: 'Học tập', href: '#' },
      { label: 'Kiểm tra', href: '#' }
    ],
    support: [
      { label: 'Trung tâm trợ giúp', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Hướng dẫn', href: '#' }
    ],
    social: [
      { label: 'Facebook', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'Twitter', href: '#' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Về chúng tôi</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Sản phẩm</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Kết nối</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 StudyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}