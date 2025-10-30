import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import QuizletHomePage from './page/HomePage'; 
import LoginPage from './LoginPage';
import RegisterPage from "./DangKy";
import Profile from "./Profile";

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
        <Route path="/asdfg" element={<Profile />} />
      </Routes>
    </Router>
  </React.StrictMode>
);