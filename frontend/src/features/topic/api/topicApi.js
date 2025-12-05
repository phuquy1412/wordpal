import axios from 'axios';

const API_URL = 'http://localhost:5001/api/topics'; // Adjust if your backend URL is different

/**
 * Lấy danh sách các chủ đề (topics) của người dùng hiện tại.
 * Yêu cầu có token xác thực trong header.
 * @param {string} token - JWT token của người dùng.
 * @returns {Promise<Array>} - Promise giải quyết với một mảng các topic.
 */
export const getMyTopicsApi = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${API_URL}/my-topics`, config);
        return response.data;
    } catch (error) {
        // Xử lý lỗi một cách chi tiết hơn
        if (error.response) {
            // Server trả về một mã lỗi (4xx, 5xx)
            console.error('Error fetching my topics:', error.response.data.message);
            throw new Error(error.response.data.message || 'Không thể lấy danh sách chủ đề.');
        } else if (error.request) {
            // Request đã được gửi nhưng không nhận được phản hồi
            console.error('No response from server:', error.request);
            throw new Error('Không có phản hồi từ máy chủ. Vui lòng kiểm tra kết nối.');
        } else {
            // Lỗi xảy ra khi thiết lập request
            console.error('Error setting up request:', error.message);
            throw new Error('Lỗi khi gửi yêu cầu. Vui lòng thử lại.');
        }
    }
};

/**
 * Creates a new topic.
 * Requires authentication token in the header.
 * @param {object} topicData - The data for the new topic (e.g., { name, description, isPrivate }).
 * @param {string} token - The user's JWT token.
 * @returns {Promise<object>} - A promise that resolves with the newly created topic object.
 */
export const createTopicApi = async (topicData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(API_URL, topicData, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Lỗi khi tạo chủ đề:', error.response.data.message);
      throw new Error(error.response.data.message || 'Không thể tạo chủ đề.');
    } else if (error.request) {
      console.error('Không có phản hồi từ máy chủ:', error.request);
      throw new Error('Không có phản hồi từ máy chủ. Vui lòng kiểm tra kết nối.');
    } else {
      console.error('Lỗi khi thiết lập yêu cầu:', error.message);
      throw new Error('Lỗi khi gửi yêu cầu. Vui lòng thử lại.');
    }
  }
};

/**
 * Get a single topic by its ID.
 * Requires authentication token in the header.
 * @param {string} topicId - The ID of the topic to retrieve.
 * @param {string} token - The user's JWT token.
 * @returns {Promise<object>} - A promise that resolves with the topic object.
 */
export const getTopicByIdApi = async (topicId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/${topicId}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error fetching topic ${topicId}:`, error.response.data.message);
      throw new Error(error.response.data.message || 'Không thể lấy thông tin chủ đề.');
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('Không có phản hồi từ máy chủ. Vui lòng kiểm tra kết nối.');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Lỗi khi gửi yêu cầu. Vui lòng thử lại.');
    }
  }
};
