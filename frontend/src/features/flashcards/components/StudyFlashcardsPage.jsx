import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Shuffle, CheckCircle, XCircle, RotateCw } from 'lucide-react';
import { getFlashcardsByTopicApi } from '../../topic-detail/api/topicDetailApi';
import studySessionApi from '../../study-session/api/studySessionApi';

const StudyFlashcardsPage = ({ topicId }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState([]);
  const [difficultCards, setDifficultCards] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const sessionStartTime = useRef(new Date());

  const currentCard = cards[currentIndex];
  const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0;

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!topicId) {
        setError('Topic ID is missing.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await getFlashcardsByTopicApi(topicId);
        setCards(data.flashcards);
        sessionStartTime.current = new Date(); // Bắt đầu tính giờ khi tải xong thẻ
        setLoading(false);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
        setError('Failed to load flashcards. Please try again.');
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [topicId]);

  useEffect(() => {
    if (showResults) {
      const sendStudySession = async () => {
        try {
          await studySessionApi.createSummaryStudySession({
            topic: topicId,
            masteredCards: masteredCards,
            difficultCards: difficultCards,
            totalCards: cards.length, // totalCards is already calculated as cards.length
            // Các trường khác như duration, startTime, endTime, completionRate sẽ được tính toán ở backend
          });
          console.log("Study session saved successfully!");
        } catch (err) {
          console.error("Failed to save study session:", err);
          // TODO: Handle error, e.g., show a toast notification to the user
        }
      };
      sendStudySession();
    }
  }, [showResults, topicId, masteredCards, difficultCards, cards.length]);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastered = () => {
    if (currentCard && !masteredCards.includes(currentCard._id)) {
      setMasteredCards([...masteredCards, currentCard._id]);
    }
    handleNext();
  };

  const handleDifficult = () => {
    if (currentCard && !difficultCards.includes(currentCard._id)) {
      setDifficultCards([...difficultCards, currentCard._id]);
    }
    handleNext();
  };

  const handleShuffle = () => {
    setCards(prevCards => {
      const shuffled = [...prevCards].sort(() => Math.random() - 0.5);
      return shuffled;
    });

    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCards([]);
    setDifficultCards([]);
    setShowResults(false);
    sessionStartTime.current = new Date(); // Reset giờ khi xáo trộn
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCards([]);
    setDifficultCards([]);
    setShowResults(false);
    sessionStartTime.current = new Date(); // Reset giờ khi học lại
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading flashcards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (cards.length === 0 && !loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Chưa có flashcard nào trong chủ đề này.</p>
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-blue-600 hover:underline mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại</span>
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Hoàn thành!</h2>
              <p className="text-gray-600">Bạn đã hoàn thành bộ thẻ này</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-green-600 text-center mb-1">
                  {masteredCards.length}
                </p>
                <p className="text-sm text-gray-600 text-center">Đã thuộc</p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center justify-center mb-2">
                  <XCircle className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-orange-600 text-center mb-1">
                  {difficultCards.length}
                </p>
                <p className="text-sm text-gray-600 text-center">Cần ôn</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleRestart}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <RotateCw className="w-5 h-5" />
                <span>Học lại</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/decks'}
                className="w-full py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Về trang chủ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Ensure currentCard is defined before accessing its properties
  if (!currentCard) {
    return null; // Or a loading spinner/message, though it should be caught by cards.length === 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại</span>
          </button>

          <button
            onClick={handleShuffle}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            <span className="text-sm font-medium">Xáo trộn</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Thẻ {currentIndex + 1} / {cards.length}
            </span>
            <span className="text-sm font-semibold text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* FlashCard */}
        <div className="mb-8">
          <div className="perspective-1000">
            <div
              className={`relative w-full h-80 transition-transform duration-500 transform-style-3d cursor-pointer ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={handleFlip}
            >
              {/* Front */}
              <div className={`absolute w-full h-full backface-hidden ${isFlipped ? 'invisible' : 'visible'}`}>
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 flex flex-col">
                  <span className="text-xs font-semibold text-white/80 bg-white/20 px-3 py-1 rounded-full self-start">
                    MẶT TRƯỚC
                  </span>
                  <div className="flex-1 flex items-center justify-center">
                    <h2 className="text-5xl font-bold text-white text-center">
                      {currentCard.front}
                    </h2>
                  </div>
                  <p className="text-center text-white/80 text-sm">
                    Click để xem mặt sau
                  </p>
                </div>
              </div>

              {/* Back */}
              <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${isFlipped ? 'visible' : 'invisible'}`}>
                <div className="w-full h-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col border-2 border-purple-200">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full self-start">
                    MẶT SAU
                  </span>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-2xl text-gray-800 mb-6 text-center">
                      {currentCard.back}
                    </p>
                    {currentCard.example && (
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">Example: </span>
                          {currentCard.example}
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-center text-gray-500 text-sm">
                    Click để quay lại
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isFlipped && (
          <div className="grid grid-cols-2 gap-4 mb-6 animate-fadeIn">
            <button
              onClick={handleDifficult}
              className="py-4 bg-orange-100 text-orange-700 rounded-xl font-semibold hover:bg-orange-200 transition-all border-2 border-orange-300 flex items-center justify-center space-x-2"
            >
              <XCircle className="w-5 h-5" />
              <span>Chưa thuộc</span>
            </button>
            <button
              onClick={handleMastered}
              className="py-4 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-all border-2 border-green-300 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Đã thuộc</span>
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Trước</span>
          </button>

          <div className="flex space-x-2">
            {cards.map((card, index) => (
              <button
                key={card._id} // Use card._id for key
                onClick={() => {
                  setCurrentIndex(index);
                  setIsFlipped(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-blue-600'
                    : masteredCards.includes(card._id)
                    ? 'bg-green-400'
                    : difficultCards.includes(card._id)
                    ? 'bg-orange-400'
                    : 'bg-gray-300'
                }`}
              ></button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            <span className="font-medium">{currentIndex === cards.length - 1 ? 'Hoàn thành' : 'Tiếp'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StudyFlashcardsPage;