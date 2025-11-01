import axios from "axios";

// URL backend (đổi port nếu khác)
const API_URL = "http://localhost:5001/api/auth";

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};