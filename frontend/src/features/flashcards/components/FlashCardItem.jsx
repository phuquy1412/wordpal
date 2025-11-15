import { useState } from 'react';
import { Volume2, Edit, Trash2, Star } from 'lucide-react';

const FlashCardItem = ({ card, onEdit, onDelete, onToggleFavorite, showActions = true }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <div
        className={`relative w-full h-64 transition-transform duration-500 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
      >
        {/* Front Side - Term */}
        <div className={`absolute w-full h-full backface-hidden ${isFlipped ? 'invisible' : 'visible'}`}>
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-white/80 bg-white/20 px-3 py-1 rounded-full">
                TERM
              </span>
              {showActions && (
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(card.id);
                    }}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Star className={`w-4 h-4 ${card.isFavorite ? 'fill-yellow-300 text-yellow-300' : 'text-white'}`} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(card.term);
                    }}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white text-center">
                {card.term}
              </h3>
            </div>

            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            <p className="text-center text-white/70 text-sm mt-2">
              Click để xem định nghĩa
            </p>
          </div>
        </div>

        {/* Back Side - Definition */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${isFlipped ? 'visible' : 'invisible'}`}>
          <div className="w-full h-full bg-white rounded-2xl shadow-xl p-6 flex flex-col border-2 border-purple-200">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                DEFINITION
              </span>
              {showActions && (
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(card);
                    }}
                    className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(card.id);
                    }}
                    className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <p className="text-xl text-gray-800 mb-4 text-center">
                {card.definition}
              </p>
              {card.example && (
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-sm text-blue-800 italic">
                    <span className="font-semibold">Example: </span>
                    {card.example}
                  </p>
                </div>
              )}
            </div>

            <p className="text-center text-gray-500 text-sm mt-4">
              Click để quay lại
            </p>
          </div>
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
      `}</style>
    </div>
  );
};

export default FlashCardItem;