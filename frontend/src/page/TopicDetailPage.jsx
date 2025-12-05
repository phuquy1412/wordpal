import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TopicInfoHeader from '../features/topic-detail/components/TopicInfoHeader';
import FlashcardList from '../features/topic-detail/components/FlashcardList';
import AddFlashcardModal from '../features/topic-detail/components/AddFlashcardModal';
import { getTopicDetailsApi, getFlashcardsByTopicApi, createFlashcardApi } from '../features/topic-detail/api/topicDetailApi';

const TopicDetailPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [showAddModal, setShowAddModal] = useState(false);
  const [topic, setTopic] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch topic details and flashcards in parallel
      const [topicData, flashcardsData] = await Promise.all([
        getTopicDetailsApi(topicId),
        getFlashcardsByTopicApi(topicId)
      ]);
      console.log("Received topicData:", topicData); // DEBUGGING
      console.log("Received flashcardsData:", flashcardsData); // DEBUGGING
      setTopic(topicData);
      setFlashcards(flashcardsData.flashcards); // Correctly extract the array from the pagination object
      setError(null);
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch topic data.';
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [topicId]);

  console.log("Current topic state before render:", topic); // DEBUGGING

  const handleAddCard = async (newCardData) => {
    try {
      const createdCard = await createFlashcardApi(topicId, newCardData);
      setFlashcards([createdCard, ...flashcards]);
      setShowAddModal(false);
      console.log('Flashcard created successfully!');
      // Optionally re-fetch all data to ensure consistency
      // fetchData(); 
    } catch (err) {
      const errorMessage = err.message || 'Failed to create flashcard.';
      console.error(errorMessage);
      // Optionally, set an error state to show in the UI
    }
  };

  const handleStudyClick = () => {
    navigate(`/study/${topicId}`); // Navigate to FlashCardPage with topicId
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopicInfoHeader topic={topic} onStudyClick={handleStudyClick} />
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
