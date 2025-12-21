import axios from "axios";

const API_URL = "http://localhost:5001/api/study-sessions";

const studySessionApi = {
  startStudySession: async (topicId) => {
    const res = await axios.post(`${API_URL}/start`, { topicId });
    return res.data;
  },

  processCardReview: async (sessionId, flashcardId, quality, timeSpent) => {
    const res = await axios.post(`${API_URL}/${sessionId}/review`, { flashcardId, quality, timeSpent });
    return res.data;
  },

  endStudySession: async (sessionId) => {
    const res = await axios.post(`${API_URL}/${sessionId}/end`);
    return res.data;
  },

  createSummaryStudySession: async (sessionData) => {
    const res = await axios.post(`${API_URL}/summary`, sessionData);
    return res.data;
  },
};

export default studySessionApi;