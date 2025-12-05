// src/features/topic-detail/api/topicDetailApi.js

// The Vite proxy in vite.config.js will forward requests starting with /api 
// to the backend server defined there (http://localhost:5001).
const API_URL = '/api';

const getToken = () => localStorage.getItem('token');

// Helper function to handle API responses
const handleResponse = async (response) => {
  // If the proxy fails or the server returns an HTML error page, the content-type won't be application/json.
  const contentType = response.headers.get("content-type");
  if (!response.ok) {
    // Try to parse JSON error first, but fallback to text if it's not JSON
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    } else {
      const errorText = await response.text();
      // The error is likely HTML, so we show a generic message.
      // The full HTML error page will be in the console.
      console.error("Non-JSON response received:", errorText);
      throw new Error('Server returned an unexpected response. See console for details.');
    }
  }
  return response.json();
};

// Fetch topic details by ID
export const getTopicDetailsApi = async (topicId) => {
  console.log("Frontend API: Fetching details for topicId:", topicId); // DEBUGGING
  const token = getToken();
  const response = await fetch(`${API_URL}/topics/${topicId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

// Fetch flashcards for a specific topic
export const getFlashcardsByTopicApi = async (topicId) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/topics/${topicId}/flashcards`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

// Create a new flashcard for a topic
export const createFlashcardApi = async (topicId, flashcardData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/topics/${topicId}/flashcards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(flashcardData),
  });
  return handleResponse(response);
};

// Delete a flashcard by its ID
export const deleteFlashcardApi = async (flashcardId) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/flashcards/${flashcardId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  // Delete doesn't always return a body, so we handle it differently
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete flashcard');
  }
  // Return a success indicator, as there might not be a JSON body
  return { success: true };
};

