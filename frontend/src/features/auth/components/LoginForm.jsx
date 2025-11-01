import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import LoginSuccessAlert from "./LoginSuccessAlert";
import SocialLoginButtons from "./SocialLoginButtons";
import LoadingSpinner from "../common/LoadingSpinner";
import { loginUser } from "../api/authApi";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    // Thêm dòng này để xóa lỗi API khi người dùng gõ lại
    if (errors.general) setErrors((prev) => ({ ...prev, general: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ";

    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
    else if (formData.password.length < 6) newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. Validate form (giữ nguyên)
    if (!validateForm()) return;

    // 2. Bật loading và xóa lỗi cũ
    setIsLoading(true);
   try {
      const res = await loginUser(formData.email, formData.password);

      // 🟥 Nếu login thành công
      console.log("✅ Login thành công:", res);
      setLoginSuccess(true);
      localStorage.setItem("token", res.Token); // lưu token
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🕒 Sau 1.5s sẽ chuyển trang (ví dụ về trang chủ)
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.error("❌ Lỗi đăng nhập:", error);
      setErrors({ general: error.message || "Sai email hoặc mật khẩu" });
    } finally {
      setIsLoading(false);
      setLoginSuccess(true);
      console.log("Login data:", formData);
    }, 1200);
  };
  

  // BƯỚC 4: GIAO DIỆN (thay <button> bằng <Link> cho điều hướng)
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Đăng nhập</h2>

      {loginSuccess && <LoginSuccessAlert />}

      {/* Phần này sẽ tự động hiển thị lỗi API từ 'errors.general' */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-red-800">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email (Giữ nguyên) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition focus:outline-none ${
                errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password (Giữ nguyên) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition focus:outline-none ${
                errors.password ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
          </label>
          
          {/* Sửa: Dùng Link thay cho button */}
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Quên mật khẩu?
          </Link>
        </div>

        {/* Nút Submit (Giữ nguyên) */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isLoading ? <LoadingSpinner /> : "Đăng nhập"}
        </button>
      </form>

      {/* (Giữ nguyên) */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">hoặc</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <SocialLoginButtons />

      <p className="mt-8 text-center text-gray-600">
        Chưa có tài khoản?{" "}
        {/* Sửa: Dùng Link thay cho button */}
        <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}
