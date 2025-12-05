import { useState } from 'react';
import { BookOpen, Sparkles, TrendingUp, Clock, Loader2, AlertCircle, Bookmark, Volume2 } from 'lucide-react';

const useDictionary = () => {
  const [wordData, setWordData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(['welcome', 'dictionary', 'example']);
  const lookupWord = async (word) => {
    setIsLoading(true);
    setError(null);
    setWordData(null);

    // Thêm từ vào lịch sử
    if (word && !history.includes(word.toLowerCase())) {
      setHistory(prev => [word.toLowerCase(), ...prev.slice(0, 4)]);
    }

    try {
      // Lấy token từ localStorage (cần cho API được bảo vệ)
      const token = localStorage.getItem('token'); 
      if (!token) {
        // Xử lý trường hợp người dùng chưa đăng nhập nếu cần
        setError("Bạn cần đăng nhập để sử dụng chức năng này.");
        setIsLoading(false);
        return;
      }

      // Gọi API backend thật - ĐÃ CẬP NHẬT PORT 5001
      const response = await fetch(`http://localhost:5001/api/words/${word.toLowerCase()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Xin lỗi, không tìm thấy định nghĩa cho từ "${word}".`);
        }
        throw new Error('Có lỗi xảy ra từ server. Vui lòng thử lại.');
      }

      const data = await response.json();
      // API của bạn trả về một object, nhưng code hiện tại mong đợi một array.
      // Chúng ta sẽ bọc nó trong một array để tương thích.
      setWordData([data]); 

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const playPronunciation = (word, audioUrl) => {
    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        audio.play().catch(e => console.error("Lỗi khi phát âm thanh:", e));
      } catch (e) {
        console.error("Không thể tạo đối tượng Audio:", e);
      }
    } else {
      console.log("Không có file phát âm cho từ này.");
    }
  };

  return { lookupWord, wordData, isLoading, error, history, playPronunciation };
};

const DictionaryView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    lookupWord,
    wordData,
    isLoading,
    error,
    history,
    playPronunciation,
  } = useDictionary();

  const handleSearch = (word) => {
    if (word && word.trim()) {
      lookupWord(word.trim());
      setSearchQuery(word.trim());
    }
  };

  const wordOfDay = {
    word: 'Serendipity',
    pronunciation: '/ˌser.ənˈdɪp.ə.ti/',
    type: 'noun',
    meaning: 'Sự may mắn tình cờ; khả năng tìm thấy điều tốt đẹp một cách bất ngờ',
    example: 'Finding that book was pure serendipity.',
    translation: 'Tìm thấy cuốn sách đó là một sự may mắn tình cờ thuần túy.'
  };

  const trendingWords = [
    { word: 'ephemeral', meaning: 'phù du, tạm bợ', rank: 1 },
    { word: 'eloquent', meaning: 'hùng biện, lưu loát', rank: 2 },
    { word: 'resilient', meaning: 'kiên cường, bền bỉ', rank: 3 },
    { word: 'aesthetic', meaning: 'thẩm mỹ', rank: 4 }
  ];

  const savedWords = [
    { word: 'serendipity', meaning: 'Sự may mắn tình cờ' },
    { word: 'ephemeral', meaning: 'phù du, tạm bợ' },
    { word: 'eloquent', meaning: 'hùng biện, lưu loát' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Component */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Tra cứu từ vựng</h2>
            </div>

            <div className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  placeholder="Nhập từ cần tra..."
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg transition-all"
                />
              </div>
              <button
                onClick={() => handleSearch(searchQuery)}
                disabled={isLoading || !searchQuery.trim()}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <BookOpen className="w-5 h-5" />
                )}
                <span>{isLoading ? 'Đang tra...' : 'Tra'}</span>
              </button>
            </div>

            {/* Quick Search */}
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600 font-medium">Gợi ý:</span>
              {['hello', 'beautiful', 'knowledge', 'success'].map((word) => (
                <button
                  key={word}
                  onClick={() => handleSearch(word)}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-lg text-sm font-medium hover:from-blue-100 hover:to-purple-100 transition-all"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 mb-1">Không tìm thấy</p>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Đang tra từ...</p>
            </div>
          )}

          {/* Word Result */}
          {wordData && !isLoading && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-slideUp">
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex-1">
                  <h2 className="text-5xl font-bold text-gray-800 mb-3">{wordData[0].word}</h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-xl text-blue-600 font-medium">{wordData[0].phonetic || wordData[0].phonetics.find(p => p.text)?.text}</span>
                    {wordData[0].phonetics.find(p => p.audio)?.audio && (
                      <button
                        onClick={() => playPronunciation(wordData[0].word, wordData[0].phonetics.find(p => p.audio)?.audio)}
                        className="p-2.5 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors"
                        aria-label="Phát âm"
                      >
                        <Volume2 className="w-5 h-5 text-blue-600" /> 
                      </button>
                    )}
                  </div>
                  {/* HIỂN THỊ NGHĨA TIẾNG VIỆT */}
                  {wordData[0].translation_vi && (
                  <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xl font-bold text-green-800">{wordData[0].translation_vi}</p>
                  </div>
                  )}
                  </div>
              </div>

              {wordData[0].origin && (
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm font-semibold text-blue-800 mb-1">Nguồn gốc</p>
                  <p className="text-sm text-blue-700">{wordData[0].origin}</p>
                </div>
              )}

              {wordData[0].meanings?.map((meaning, idx) => (
                <div key={idx} className="space-y-4 mb-6">
                  <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold">
                    {meaning.partOfSpeech}
                  </div>
                  {meaning.definitions?.map((def, midx) => (
                    <div key={midx} className="pl-4 border-l-4 border-blue-300">
                      <p className="text-lg text-gray-800 font-medium mb-2">
                        {midx + 1}. {def.definition}
                      </p>
                      {def.example && (
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                          <p className="text-gray-700 italic">
                            <span className="font-semibold text-blue-700">Ví dụ:</span> "{def.example}"
                          </p>
                        </div>
                      )}
                      {(def.synonyms?.length > 0 || def.antonyms?.length > 0) && (
                        <div className="grid md:grid-cols-2 gap-4 pt-4 mt-4 border-t border-gray-200">
                          {def.synonyms?.length > 0 && (
                            <div>
                              <h3 className="font-bold text-gray-800 mb-3">Từ đồng nghĩa</h3>
                              <div className="flex flex-wrap gap-2">
                                {def.synonyms.map((syn, sidx) => (
                                  <button
                                    key={sidx}
                                    onClick={() => handleSearch(syn)}
                                    className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                                  >
                                    {syn}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {def.antonyms?.length > 0 && (
                            <div>
                              <h3 className="font-bold text-gray-800 mb-3">Từ trái nghĩa</h3>
                              <div className="flex flex-wrap gap-2">
                                {def.antonyms.map((ant, aidx) => (
                                  <button
                                    key={aidx}
                                    onClick={() => handleSearch(ant)}
                                    className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                  >
                                    {ant}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!wordData && !isLoading && !error && (
            <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Bắt đầu tra từ</h3>
              <p className="text-gray-600">Nhập từ vựng bạn muốn tìm hiểu ở trên</p>
            </div>
          )}
        </div>
        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Saved Words */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Bookmark className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-800">Từ đã lưu</h3>
            </div>
            <div className="space-y-3">
              {savedWords.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(item.word)}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <p className="font-semibold text-gray-800 group-hover:text-blue-600">
                    {item.word}
                  </p>
                  <p className="text-sm text-gray-600">{item.meaning}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Word of the Day */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-yellow-200">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-600" />
              <h3 className="font-bold text-gray-800">Từ trong ngày</h3>
            </div>
            <div className="mb-3">
              <h4 className="text-2xl font-bold text-gray-800 mb-1">{wordOfDay.word}</h4>
              <p className="text-sm text-gray-600 mb-1">{wordOfDay.pronunciation}</p>
              <span className="inline-block px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs font-semibold">
                {wordOfDay.type}
              </span>
            </div>
            <p className="text-gray-700 font-medium mb-2">{wordOfDay.meaning}</p>
            <div className="bg-white rounded-lg p-3 mt-3">
              <p className="text-sm text-gray-700 italic mb-1">"{wordOfDay.example}"</p>
              <p className="text-sm text-gray-600">"{wordOfDay.translation}"</p>
            </div>
          </div>

          {/* Trending Words */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-gray-800">Từ thịnh hành</h3>
            </div>
            <div className="space-y-3">
              {trendingWords.map((item) => (
                <button
                  key={item.rank}
                  onClick={() => handleSearch(item.word)}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 group-hover:text-blue-600">
                        {item.word}
                      </p>
                      <p className="text-sm text-gray-600">{item.meaning}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-400">#{item.rank}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Search History */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3 className="font-bold text-gray-800">Lịch sử tra cứu</h3>
            </div>
            <div className="space-y-2">
              {history.length > 0 ? (
                history.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(item)}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors group flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-800 group-hover:text-purple-600 capitalize">
                      {item}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-2">Chưa có lịch sử tra cứu.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DictionaryView;