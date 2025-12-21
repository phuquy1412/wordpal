import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Assuming jwt-decode is installed

const AuthContext = createContext(null);

const API_BASE_URL = 'http://localhost:5001/api'; // Base URL for your backend API

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // State to store the JWT token
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on initial render
  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const decodedUser = jwtDecode(storedToken); // Decode the user from the token
          setUser(decodedUser);
          setToken(storedToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        } catch (error) {
          console.error("Error decoding token:", error);
          localStorage.removeItem('token'); // Clear invalid token
        }
      }
      setLoading(false);
    };
    loadUserFromStorage();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      const { token: receivedToken, user: userData } = response.data; // Assuming backend sends { token, user }

      localStorage.setItem('token', receivedToken);
      setToken(receivedToken);
      setUser(userData); // Set user data from backend response
      axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
      return userData;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error; // Re-throw to be handled by the component
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};