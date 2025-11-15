import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';

const DictionarySearch = ({ onSearch, searchHistory = [], suggestions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectWord = (word) => {
    setSearchTerm(word);
    onSearch(word);
    setShowSuggestions(false);
  };

  const quickSearchWords = ['hello', 'beautiful', 'knowledge', 'success', 'happiness'];

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Search className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Tra cứu từ vựng</h2>
        </div>

        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập từ cần tra..."
              className="w-full px-5 py-3.5 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg transition-all hover:border-gray-300"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  inputRef.current?.focus();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          <button
            onClick={handleSearch}
            disabled={!searchTerm.trim()}
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>Tra</span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600 font-medium">Gợi ý:</span>
          {quickSearchWords.map((word) => (
            <button
              key={word}
              onClick={() => selectWord(word)}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-lg text-sm font-medium hover:from-blue-100 hover:to-purple-100 transition-all border border-blue-200"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && searchTerm && (suggestions.length > 0 || searchHistory.length > 0) && (
        <div className="absolute z-20 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn">
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2 border-b border-gray-100">
              <div className="flex items-center px-3 py-2 space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Gợi ý tìm kiếm
                </span>
              </div>
              {suggestions.slice(0, 5).map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => selectWord(word)}
                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    <span className="font-medium text-gray-800 group-hover:text-blue-600">
                      {word}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="p-2">
              <div className="flex items-center px-3 py-2 space-x-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Tìm kiếm gần đây
                </span>
              </div>
              {searchHistory.slice(0, 5).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => selectWord(item.word)}
                  className="w-full text-left px-4 py-2.5 hover:bg-purple-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                      <span className="font-medium text-gray-800 group-hover:text-purple-600">
                        {item.word}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DictionarySearch;