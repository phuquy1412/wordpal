// src/features/decks/components/DeckList.jsx
import { useState } from 'react';
import { BookOpen, Users, Star, MoreVertical, Edit, Trash2 } from 'lucide-react';

const DeckList = ({ decks, onSelectDeck, onEditDeck, onDeleteDeck }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleMenuToggle = (e, deckId) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === deckId ? null : deckId);
  };

  const handleEdit = (e, deck) => {
    e.stopPropagation();
    onEditDeck(deck);
    setOpenMenuId(null);
  };

  const handleDelete = (e, deckId) => {
    e.stopPropagation();
    onDeleteDeck(deckId);
    setOpenMenuId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {decks.map((deck) => (
        <div
          key={deck.id}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
          onClick={() => onSelectDeck(deck)}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="relative">
                <button
                  onClick={(e) => handleMenuToggle(e, deck.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
                {openMenuId === deck.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10 border border-gray-100">
                    <button
                      onClick={(e) => handleEdit(e, deck)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, deck.id)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {deck.title}
            </h3>
            {deck.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {deck.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{deck.totalCards} thẻ</span>
                </span>
                {deck.isPublic && (
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{deck.studyCount || 0}</span>
                  </span>
                )}
              </div>
              {deck.isFavorite && (
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              )}
            </div>

            {/* Progress Bar (if studying) */}
            {deck.progress !== undefined && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Tiến độ</span>
                  <span>{deck.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
                    style={{ width: `${deck.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 rounded-b-2xl border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">
                    {deck.author?.name?.[0] || 'U'}
                  </span>
                </div>
                <span className="text-xs text-gray-600">{deck.author?.name || 'Anonymous'}</span>
              </div>
              <span className="text-xs text-gray-500">{deck.createdAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeckList;