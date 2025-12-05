// src/features/flashcards/services/flashcardService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const flashcardService = {
  // Get all flashcards for a topic
  getFlashcardsByTopic: async (topicId) => {
    const response = await axios.get(`${API_URL}/topics/${topicId}/flashcards`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  },

  // Create flashcard in a topic
  createFlashcardInTopic: async (topicId, cardData) => {
    const response = await axios.post(
      `${API_URL}/topics/${topicId}/flashcards`,
      cardData,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    );
    return response.data;
  },

  // Get all flashcards in a deck
  getFlashcards: async (deckId) => {
    const response = await axios.get(`${API_URL}/decks/${deckId}/flashcards`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  },

  // Create flashcard
  createFlashcard: async (deckId, cardData) => {
    const response = await axios.post(
      `${API_URL}/decks/${deckId}/flashcards`,
      cardData,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    );
    return response.data;
  },

  // Update flashcard
  updateFlashcard: async (cardId, cardData) => {
    const response = await axios.put(
      `${API_URL}/flashcards/${cardId}`,
      cardData,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    );
    return response.data;
  },

  // Delete flashcard
  deleteFlashcard: async (cardId) => {
    const response = await axios.delete(`${API_URL}/flashcards/${cardId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  },

  // Toggle favorite
  toggleFavorite: async (cardId) => {
    const response = await axios.post(
      `${API_URL}/flashcards/${cardId}/favorite`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    );
    return response.data;
  }
};

export default flashcardService;