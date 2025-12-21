import axios from "axios";

const API_URL = "http://localhost:5001/api/study-sessions"; // Assuming this will be the base URL for study sessions

export const saveStudySession = async (sessionData) => {
  try {
    const res = await axios.post(API_URL, sessionData);
    return res.data;
  } catch (error) {
    console.error("Error saving study session:", error);
    throw error.response?.data || { message: "Failed to save study session" };
  }
};