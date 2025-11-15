// src/pages/MyDecksPage.jsx
import { useState } from 'react';
import { Plus, Search, Grid, List } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import DeckList from '../features/decks/components/DeckList';
import CreateDeckModal from '../features/decks/components/CreateDeckModal';

const MyDecksPage = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [decks, setDecks] = useState([
    {
      id: 1,
      title: 'IELTS Vocabulary - Unit 1',
      description: 'Từ vựng IELTS chủ đề Education',
      totalCards: 50,
      author: { name: 'Nguyễn Văn A' },
      isPublic: true,
      isFavorite: true,
      progress: 75,
      studyCount: 1234,
      createdAt: '2 ngày trước'
    },
    {
      id: 2,
      title: 'English Grammar Basics',
      description: 'Ngữ pháp tiếng Anh cơ bản',
      totalCards: 30,
      author: { name: 'Trần Thị B' },
      isPublic: false,
      isFavorite: false,
      progress: 40,
      createdAt: '1 tuần trước'
    },
  ]);

  const handleCreateDeck = (deckData) => {
    const newDeck = {
      id: Date.now(),
      ...deckData,
      totalCards: 0,
      author: { name: 'You' },
      progress: 0,
      studyCount: 0,
      createdAt: 'Vừa xong'
    };
    setDecks([newDeck, ...decks]);
  };

  const handleSelectDeck = (deck) => {
    window.location.href = `/study/${deck.id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bộ thẻ của tôi</h1>
          <p className="text-gray-600">Quản lý và học tập với các bộ thẻ của bạn</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bộ thẻ..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* View Mode */}
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Create Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Tạo bộ thẻ</span>
            </button>
          </div>
        </div>

        {/* Deck List */}
        <DeckList
          decks={decks}
          onSelectDeck={handleSelectDeck}
        />

        {/* Empty State */}
        {decks.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Chưa có bộ thẻ nào</h3>
            <p className="text-gray-600 mb-6">Tạo bộ thẻ đầu tiên để bắt đầu học!</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Tạo bộ thẻ</span>
            </button>
          </div>
        )}
      </div>

      <Footer />

      {/* Create Modal */}
      <CreateDeckModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateDeck={handleCreateDeck}
      />
    </div>
  );
};

export default MyDecksPage;
// ```

// ---

// ## 🎯 **Tổng kết structure:**
// ```
// ✅ FlashCardItem.jsx - Component thẻ đơn
// ✅ StudyFlashcardsPage.jsx - Trang học thẻ
// ✅ DeckList.jsx - Danh sách bộ thẻ
// ✅ CreateDeckModal.jsx - Modal tạo bộ thẻ
// ✅ MyDecksPage.jsx - Trang quản lý bộ thẻ
// ✅ flashcardService.js - API service