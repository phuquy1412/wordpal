import { useState } from 'react';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { forgotPassword } from '../api/authApi';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setError('');

    if (!email.trim()) {
      setError('Vui lòng nhập email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email không hợp lệ');
      return;
    }

    setIsLoading(true);

     try {
      // 🟡 Gọi API thật từ backend
      const res = await forgotPassword(email);
      console.log("📨 Server response:", res);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Kiểm tra email của bạn
        </h2>
        <p className="text-center text-gray-600 mb-2">
          Chúng tôi đã gửi link đặt lại mật khẩu đến
        </p>
        <p className="text-center font-semibold text-gray-800 mb-6">
          {email}
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-800">
            📧 Link sẽ hết hạn sau <span className="font-semibold">15 phút</span>. 
            Nếu không thấy email, hãy kiểm tra thư mục spam.
          </p>
        </div>

        <button
          onClick={handleBackToLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Quay lại đăng nhập
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Không nhận được email?{' '}
          <button
            onClick={() => setIsSuccess(false)}
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Gửi lại
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
      {/* Back Button */}
      <button
        onClick={handleBackToLogin}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Quay lại đăng nhập</span>
      </button>

      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <Mail className="w-10 h-10 text-blue-600" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-3">
        Quên mật khẩu?
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Nhập email của bạn và chúng tôi sẽ gửi link để đặt lại mật khẩu
      </p>

      {/* Form */}
      <div className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Địa chỉ Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="example@email.com"
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none hover:border-gray-300"
              disabled={isLoading}
            />
          </div>
          {error && (
            <div className="mt-3 flex items-start bg-red-50 border border-red-200 rounded-lg p-3">
              <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Đang gửi...
            </>
          ) : (
            'Gửi link đặt lại mật khẩu'
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">hoặc</span>
        </div>
      </div>

      {/* Help Text */}
      <p className="text-center text-sm text-gray-600">
        Bạn nhớ lại mật khẩu?{' '}
        <button
          onClick={handleBackToLogin}
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
        >
          Đăng nhập ngay
        </button>
      </p>

      {/* Security Note */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
          🔒 Thông tin của bạn được bảo mật và mã hóa
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;