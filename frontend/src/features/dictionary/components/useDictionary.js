import { useState } from 'react';

export const useDictionary = () => {
  const [wordData, setWordData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(['welcome', 'dictionary', 'example']);

  const lookupWord = async (word) => {
    setIsLoading(true);
    setError(null);
    setWordData(null);

    if (word && !history.includes(word.toLowerCase())) {
      setHistory(prev => [word.toLowerCase(), ...prev.slice(0, 4)]);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Bạn cần đăng nhập để sử dụng chức năng này.");
        setIsLoading(false);
        return;
      }

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