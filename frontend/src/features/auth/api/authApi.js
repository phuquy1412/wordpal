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