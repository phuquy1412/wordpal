import React from 'react';
import { useParams } from 'react-router-dom';
import StudyFlashcardsPage from '../features/flashcards/components/StudyFlashcardsPage';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function FlashCardPage (){
  const { topicId } = useParams();
  return (
    <div>
  <Header/>
  <StudyFlashcardsPage topicId={topicId} />
  <Footer/>
  </div>
)
};


