// src/page/TopicDetailPage.jsx
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TopicInfoHeader from '../features/topic-detail/components/TopicInfoHeader';
import FlashcardList from '../features/topic-detail/components/FlashcardList';
import AddFlashcardModal from '../features/topic-detail/components/AddFlashcardModal';

const TopicDetailPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  // Static data for now, similar to MyDecksPage
  const topicDetails = {
    id: 1,
    title: 'IELTS Vocabulary - Unit 1',
    description: 'Từ vựng IELTS chủ đề Education, bao gồm 50 từ thường gặp trong các bài thi nói và viết.',
    totalCards: 50,
    author: { name: 'Nguyễn Văn A' },
    isPublic: true,
    isFavorite: true,
    progress: 75,
    studyCount: 1234,
    createdAt: '2 ngày trước',
    tags: ['IELTS', 'Education', 'English'],
  };

  const initialFlashcards = [
    { id: 1, front: 'Education', back: 'Giáo dục', pronunciation: '/ˌedʒuˈkeɪʃn/', example: 'She received a good education.' },
    { id: 2, front: 'University', back: 'Trường đại học', pronunciation: '/ˌjuːnɪˈvɜːsəti/', example: 'He is a student at a prestigious university.' },
    { id: 3, front: 'Student', back: 'Sinh viên', pronunciation: '/ˈstjuːdnt/', example: 'The student was praised by the teacher.' },
    { id: 4, front: 'Teacher', back: 'Giáo viên', pronunciation: '/ˈtiːtʃə(r)/', example: 'The teacher explained the lesson clearly.' },
    { id: 5, front: 'Classroom', back: 'Lớp học', pronunciation: '/ˈklɑːsruːm/', example: 'The classroom was filled with students.' },
  ];
  
  const [flashcards, setFlashcards] = useState(initialFlashcards);

  const handleAddCard = (newCard) => {
    setFlashcards([newCard, ...flashcards]);
    // In a real app, you would also update the topic's totalCards count
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopicInfoHeader topic={topicDetails} />
        <FlashcardList flashcards={flashcards} onAddCardClick={() => setShowAddModal(true)} />
      </main>

      <Footer />
      <AddFlashcardModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddCard={handleAddCard}
      />
    </div>
  );
};

export default TopicDetailPage;
