import axios from "axios";

const API_URL = "http://localhost:5001/api/user";

export const getUserProfile = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${API_URL}/me`, config);
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi lấy thông tin người dùng:", error);
    throw error.response?.data || { message: "Lỗi không xác định" };
  }
};

export const updateUserProfile = async (token, userData) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.patch(`${API_URL}/me`, userData, config);
        return res.data;
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật thông tin người dùng:", error);
        throw error.response?.data || { message: "Lỗi không xác định" };
    }
};

// Sửa lại hàm này cho đúng
export const updateMyPassword = async (token, passwordData) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // URL và phương thức đúng: PATCH /api/auth/update-my-password
        const res = await axios.patch(`http://localhost:5001/api/auth/update-my-password`, passwordData, config);
        return res.data;
    } catch (error) {
        console.error("❌ Lỗi khi đổi mật khẩu:", error);
        throw error.response?.data || { message: "Lỗi không xác định" };
    }
};
