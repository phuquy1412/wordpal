import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import QuizletHomePage from './page/HomePage'; 
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import Profile from "./Profile";
import ForgotPasswordPage from "./page/ForgotPasswordPage";
import ResetPasswordPage from "./page/ResetPasswordPage";
import FlashCardPage from "./page/FlashCardPage";
import MyTopicPage from "./page/MyTopicPage";
import TestFlashCardItemPage from "./page/TestFlashCardItemPage";
import CreateFlashcardPage from "./page/CreateFlashcardPage";
import DictionaryPage from './page/DictionaryPage';
import StudyReminderPage from './page/StudyReminderPage';
import TopicDetailPage from './page/TopicDetailPage'; // Import the new page
const root = ReactDOM.createRoot(document.getElementById('root'));

// 3. Render ứng dụng
root.render(
  <React.StrictMode>
   
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        {}
        <Route path="/" element={<QuizletHomePage />} />
        
        {}
        <Route path="/login" element={<LoginPage />} />
        {}
        <Route path="/sss" element={<Profile />} />
        {}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {}
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        {}
        <Route path="/study/:topicId" element={<FlashCardPage />} />
        {}
        <Route path="/decks" element={<MyTopicPage />} />
        {}
        <Route path="/topics/:topicId" element={<TopicDetailPage />} />
        {}
        <Route path="/test" element={<TestFlashCardItemPage />} />
        {}
        <Route path="/create-deck" element={<CreateFlashcardPage />} />
        {}
        <Route path="/dictionary" element={<DictionaryPage />} />
        {}
        <Route path="/studyreminder" element={<StudyReminderPage/>}/>
        {}
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);