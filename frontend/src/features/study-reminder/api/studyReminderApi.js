import axios from 'axios';

const API_URL = 'http://localhost:5001/api/schedules';

// Helper để lấy config header
const getAuthConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

/**
 * Lấy danh sách lịch học của user
 */
export const getMySchedulesApi = async (token) => {
    try {
        const response = await axios.get(API_URL, getAuthConfig(token));
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Không thể lấy danh sách lịch học.');
    }
};

/**
 * Tạo lịch học mới
 * @param {Object} scheduleData - { topicId, scheduledDate, scheduledTime, duration, reminderBefore, notes }
 */
export const createScheduleApi = async (scheduleData, token) => {
    try {
        const response = await axios.post(API_URL, scheduleData, getAuthConfig(token));
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Không thể tạo lịch học.');
    }
};

/**
 * Cập nhật lịch học (ví dụ: đánh dấu hoàn thành)
 * @param {string} id - ID của schedule
 * @param {Object} updates - Dữ liệu cần update
 */
export const updateScheduleApi = async (id, updates, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updates, getAuthConfig(token));
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Không thể cập nhật lịch học.');
    }
};

/**
 * Xóa lịch học
 */
export const deleteScheduleApi = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, getAuthConfig(token));
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Không thể xóa lịch học.');
    }
};
