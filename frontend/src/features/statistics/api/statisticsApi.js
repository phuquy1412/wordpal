// frontend/src/features/statistics/api/statisticsApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/statistics'; // Assuming your backend runs on 5001

// Set up axios to send cookies with requests (if needed for authentication)
axios.defaults.withCredentials = true;

const statisticsApi = {
    getOverallStats: async () => {
        const response = await axios.get(`${API_URL}/overall`);
        return response.data;
    },

    getDailyStats: async () => {
        const response = await axios.get(`${API_URL}/daily`);
        return response.data;
    },

    getFlashcardProgress: async () => {
        const response = await axios.get(`${API_URL}/flashcard-progress`);
        return response.data;
    },

    getStudySessionsSummary: async () => {
        const response = await axios.get(`${API_URL}/sessions`);
        return response.data;
    },
};

export default statisticsApi;