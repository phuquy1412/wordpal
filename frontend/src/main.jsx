import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import QuizletHomePage from './page/HomePage'; 
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import ForgotPasswordPage from "./page/ForgotPasswordPage";
import ResetPasswordPage from "./page/ResetPasswordPage";
import FlashCardPage from "./page/FlashCardPage";
import MyTopicPage from "./page/MyTopicPage";
import TestFlashCardItemPage from "./page/TestFlashCardItemPage";
import CreateFlashcardPage from "./page/CreateFlashcardPage";
import DictionaryPage from './page/DictionaryPage';
import StudyReminderPage from './page/StudyReminderPage';
import TopicDetailPage from './page/TopicDetailPage'; 
import ProfilePage from './page/ProfilePage';
import StatisticsPage from './page/StatisticsPage';
import NotificationsPage from './page/NotificationsPage';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the Router with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<QuizletHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/notifications" an element={<NotificationsPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/study/:topicId" element={<FlashCardPage />} />
          <Route path="/decks" element={<MyTopicPage />} />
          <Route path="/topics/:topicId" element={<TopicDetailPage />} />
          <Route path="/test" element={<TestFlashCardItemPage />} />
          <Route path="/create-deck" element={<CreateFlashcardPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/studyreminder" element={<StudyReminderPage/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);