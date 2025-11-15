// src/features/dictionary/services/dictionaryService.js
import axios from 'axios';

const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';
const DATAMUSE_API = 'https://api.datamuse.com';

const dictionaryService = {
  // Lookup word
  lookupWord: async (word) => {
    try {
      const response = await axios.get(`${DICTIONARY_API}/${word.toLowerCase()}`);
      return response.data; // Return the full array
    } catch (err) {
      if (err.response?.status === 404) {
        throw new Error(`Không tìm thấy định nghĩa cho từ "${word}". Vui lòng kiểm tra lại chính tả.`);
      }
      throw new Error('Có lỗi xảy ra trong quá trình tra từ. Vui lòng thử lại.');
    }
  },

  // Get word suggestions (autocomplete)
  getSuggestions: async (query) => {
    try {
      const response = await axios.get(`${DATAMUSE_API}/sug`, {
        params: { s: query, max: 8 }
      });
      return response.data.map(item => item.word);
    } catch (err) {
      console.error('Error getting suggestions:', err);
      return [];
    }
  },

  // Get rhymes (optional feature)
  getRhymes: async (word) => {
    try {
      const response = await axios.get(`${DATAMUSE_API}/words`, {
        params: { rel_rhy: word, max: 10 }
      });
      return response.data.map(item => item.word);
    } catch (err) {
      console.error('Error getting rhymes:', err);
      return [];
    }
  },

  // Get similar words
  getSimilarWords: async (word) => {
    try {
      const response = await axios.get(`${DATAMUSE_API}/words`, {
        params: { ml: word, max: 10 }
      });
      return response.data.map(item => item.word);
    } catch (err) {
      console.error('Error getting similar words:', err);
      return [];
    }
  },

  // Save search history
  saveToHistory: (word) => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [
      { word, timestamp: new Date().toISOString() },
      ...history.filter(h => h.word !== word)
    ].slice(0, 50);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  },

  // Get search history
  getHistory: () => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    return history.map(item => ({
      word: item.word,
      time: formatTime(new Date(item.timestamp))
    }));
  },

  // Toggle favorite
  toggleFavorite: (word) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(word);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(word);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return favorites;
  },

  // Get favorites
  getFavorites: () => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  },

  // Check if word is favorite
  isFavorite: (word) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(word);
  }
};

// Helper function
function formatTime(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) return 'Vừa xong';
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;
  return `${Math.floor(diff / 604800)} tuần trước`;
}

export default dictionaryService;
