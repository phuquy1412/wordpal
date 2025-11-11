import axios from "axios";

// URL backend (đổi port nếu khác)
const API_URL = "http://localhost:5001/api/auth";

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi đăng nhập:", error);
    throw error.response?.data || { message: "Lỗi không xác định" };
  }
};
export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/forgot-password`, { email });
    return res.data; // server trả về message thông báo đã gửi email
  } catch (error) {
    console.error("❌ Lỗi khi gửi yêu cầu quên mật khẩu:", error);
    throw error.response?.data || { message: "Lỗi không xác định khi gửi email reset" };
  }
};
// 🟢 Đặt lại mật khẩu (khi người dùng bấm link trong email)
export const resetPassword = async (token, password, passwordConfirm) => {
  try {
    // Gửi cả password và passwordConfirm
    const res = await axios.patch(`${API_URL}/reset-password/${token}`, { password, passwordConfirm });
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi đặt lại mật khẩu:", error);
    throw error.response?.data || { message: "Lỗi không xác định" };
  }
};