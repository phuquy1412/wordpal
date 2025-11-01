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
const root = ReactDOM.createRoot(document.getElementById('root'));

// 3. Render ứng dụng
root.render(
  <React.StrictMode>
   
    <Router>
      <Routes>
        <Route path="/signup" element={<RegisterPage />} />
        {}
        <Route path="/" element={<QuizletHomePage />} />
        
        {}
        <Route path="/login" element={<LoginPage />} />
        {}
        <Route path="/sss" element={<Profile />} />
        {}
        <Route path="/quenmk" element={<ForgotPasswordPage />} />
        {}
        <Route path="/resetmk" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);