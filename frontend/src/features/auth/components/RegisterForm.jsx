import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, User } from "lucide-react";
import SocialRegisterButtons from "./SocialRegisterButtons";
import { registerUser } from "../api/authApi";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

 const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-300';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Yếu';
    if (passwordStrength === 2) return 'Trung bình';
    if (passwordStrength === 3) return 'Khá';
    return 'Mạnh';
  };


  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === "password") setPasswordStrength(calculatePasswordStrength(value));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên";
    if (!formData.email) newErrors.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ";
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    if (!formData.agreeTerms) newErrors.agreeTerms = "Bạn phải đồng ý điều khoản";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // Gửi data thật sang backend
      const payload = {
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.confirmPassword,
        displayName: formData.fullName,
      };
       const res = await registerUser(payload);
      console.log("✅ Đăng ký thành công:", res);
      setTimeout(() => {
        navigate('/login'); // <-- Thay '/login' bằng path đến trang đăng nhập của bạn
      }, 2000);
      setRegisterSuccess(true);
    } catch (err) {
      console.error("❌ Lỗi khi đăng ký:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Có lỗi xảy ra khi đăng ký");
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 order-2 md:order-1">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Tạo tài khoản</h2>
      <p className="text-gray-600 mb-8">Bắt đầu hành trình học tập của bạn</p>

      {registerSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-medium">Đăng ký thành công!</p>
            <p className="text-green-600 text-sm">Chào mừng bạn đến với WordPal</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Họ tên */}
        <div>
          <label className="block text-sm font-semibold mb-1">Họ và tên</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:border-purple-500"
              placeholder="Nguyễn Văn A"
            />
          </div>
          {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:border-purple-500"
              placeholder="example@email.com"
            />
          </div>
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Mật khẩu */}
        <div>
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                        Mật khẩu
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Tối thiểu 8 ký tự"
                          className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition focus:outline-none ${
                            errors.password 
                              ? 'border-red-300 focus:border-red-500' 
                              : 'border-gray-200 focus:border-purple-500'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className={`h-1 flex-1 rounded-full transition-colors ${
                                  level <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-300'
                                }`}
                              ></div>
                            ))}
                          </div>
                          <p className={`text-xs ${
                            passwordStrength <= 1 ? 'text-red-600' :
                            passwordStrength === 2 ? 'text-orange-600' :
                            passwordStrength === 3 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            Độ mạnh: {getPasswordStrengthText()}
                          </p>
                        </div>
                      )}
                      
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.password}</span>
                        </p>
                      )}
                    </div>
        

        {/* Xác nhận mật khẩu */}
        <div>
          <label className="block text-sm font-semibold mb-1">Xác nhận mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-3 rounded-xl border-2 focus:border-purple-500"
              placeholder="Nhập lại mật khẩu"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Điều khoản */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="mt-1"
          />
          <span className="text-sm text-gray-600">
            Tôi đồng ý với{" "}
            <a href="#" className="text-purple-600 font-medium">
              Điều khoản sử dụng
            </a>{" "}
            và{" "}
            <a href="#" className="text-purple-600 font-medium">
              Chính sách bảo mật
            </a>
          </span>
        </div>
        {errors.agreeTerms && <p className="text-red-600 text-sm mt-1">{errors.agreeTerms}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold"
        >
          {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">hoặc</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <SocialRegisterButtons />
    </div>
  );
}
