// src/features/topic-detail/components/FlashcardList.jsx
import React from 'react';
import { Volume2, Star, Edit, Trash2, Plus } from 'lucide-react';

const FlashcardList = ({ flashcards, onAddCardClick }) => {
  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Chủ đề này chưa có thẻ nào</h3>
        <p className="text-gray-600">Hãy thêm thẻ để bắt đầu học.</p>
      </div>
    );
  }

  const playAudio = (audioUrl) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const difficultyStyles = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Danh sách từ vựng ({flashcards.length})</h2>
        <button
          onClick={onAddCardClick}
          className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm thẻ mới</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <ul className="divide-y divide-gray-100">
            {flashcards.map((card) => (
              <li key={card.id} className="p-6 hover:bg-gray-50/50">
                <div className="grid grid-cols-12 gap-4 items-center">
                  
                  {/* Image */}
                  <div className="col-span-2">
                    {card.imageUrl ? (
                      <img src={card.imageUrl} alt={card.front} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Main Content */}
                  <div className="col-span-8 md:col-span-7">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-bold text-gray-900">{card.front}</h3>
                      {card.pronunciation && <p className="text-gray-500 italic">[{card.pronunciation}]</p>}
                    </div>
                    <p className="text-gray-700 mt-1">{card.back}</p>
                    {card.example && <p className="text-sm text-gray-500 mt-2">"{card.example}"</p>}
                  </div>
                  
                  {/* Meta & Actions */}
                  <div className="col-span-12 md:col-span-3 flex flex-col items-start md:items-end justify-between h-full">
                    {card.difficulty && (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyStyles[card.difficulty]}`}>
                        {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
                      </span>
                    )}

                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                      <button 
                        onClick={() => playAudio(card.audioUrl)} 
                        disabled={!card.audioUrl}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Volume2 className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Edit className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>

                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FlashcardList;
