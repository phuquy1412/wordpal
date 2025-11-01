import { Mail, Shield, Clock, ArrowRight } from 'lucide-react';

const ForgotPasswordBranding = () => {
  return (
    <div className="hidden md:block space-y-8">
      {/* Logo & Title */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QuizFlash
            </h1>
            <p className="text-sm text-gray-600">Khôi phục tài khoản</p>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Đừng lo lắng! 😊
        </h2>
        <p className="text-lg text-gray-600">
          Chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào tài khoản một cách nhanh chóng và an toàn.
        </p>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100 hover:border-purple-300 transition-all">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Bảo mật tối đa</h3>
            <p className="text-sm text-gray-600">
              Link đặt lại mật khẩu được mã hóa và chỉ sử dụng một lần
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100 hover:border-purple-300 transition-all">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Nhanh chóng</h3>
            <p className="text-sm text-gray-600">
              Nhận email ngay lập tức và đặt lại mật khẩu trong vài phút
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100 hover:border-purple-300 transition-all">
          <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Đơn giản</h3>
            <p className="text-sm text-gray-600">
              Chỉ cần email, không cần thông tin phức tạp
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <div>
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            99.9%
          </div>
          <div className="text-sm text-gray-600 mt-1">Thành công</div>
        </div>
        <div>
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            &lt;2min
          </div>
          <div className="text-sm text-gray-600 mt-1">Thời gian</div>
        </div>
        <div>
          <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
            24/7
          </div>
          <div className="text-sm text-gray-600 mt-1">Hỗ trợ</div>
        </div>
      </div>

      {/* Help Link */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-800">Cần hỗ trợ?</p>
            <p className="text-sm text-gray-600">Liên hệ đội ngũ support</p>
          </div>
          <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors">
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordBranding;