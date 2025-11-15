// src/features/dictionary/hooks/useDictionary.js
import { useState, useEffect } from 'react';
import dictionaryService from '../api/dictionaryApi';

export const useDictionary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wordData, setWordData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadHistory();
    loadFavorites();
  }, []);

  const loadHistory = () => {
    setHistory(dictionaryService.getHistory());
  };

  const loadFavorites = () => {
    setFavorites(dictionaryService.getFavorites());
  };

  const lookupWord = async (word) => {
    if (!word.trim()) {
      setError('Vui lòng nhập từ cần tra');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await dictionaryService.lookupWord(word);
      setWordData(data);
      
      dictionaryService.saveToHistory(word);
      loadHistory();
      
      return data;
    } catch (err) {
      setError(err.message);
      setWordData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const results = await dictionaryService.getSuggestions(query);
      setSuggestions(results);
    } catch (err) {
      setError(err.message);
      setSuggestions([]);
    }
  };

  const toggleFavorite = (word) => {
    const newFavorites = dictionaryService.toggleFavorite(word);
    setFavorites(newFavorites);
    return newFavorites.includes(word);
  };

  const isFavorite = (word) => {
    return dictionaryService.isFavorite(word);
  };

  const playPronunciation = (word, audioUrl = null) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
    setHistory([]);
  };

  const reset = () => {
    setWordData(null);
    setError(null);
    setSuggestions([]);
  };

  return {
    isLoading,
    error,
    wordData,
    suggestions,
    history,
    favorites,
    lookupWord,
    getSuggestions,
    toggleFavorite,
    isFavorite,
    playPronunciation,
    clearHistory,
    reset
  };
};

export default useDictionary;
// ```

// ---

// ## 🎯 **Tổng kết - Files đã tạo:**
// ```
// ✅ DictionarySearch.jsx - Component search bar
// ✅ WordResult.jsx - Hiển thị kết quả từ
// ✅ DictionaryPage.jsx - Page hoàn chỉnh
// ✅ dictionaryService.js - API service (Free Dictionary API)
// ✅ useDictionary.js - Custom hook

// API sử dụng:
// - Dictionary API: api.dictionaryapi.dev (FREE)
// - Datamuse API: api.datamuse.com (FREE - suggestions)