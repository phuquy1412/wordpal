import React, { useState, useEffect } from 'react';
import { updateMyPassword } from '../features/profile/api/userApi.js';
import { getUserProfile, updateUserProfile } from '../features/profile/api/userApi.js';
import { BookOpen, User, Camera, Save, Edit2, X, CheckCircle, AlertCircle, Shield, LogOut, TrendingUp, Bell, Loader2 } from 'lucide-react';
import UserInfo from '../features/profile/components/UserInfo';
import ChangePasswordForm from '../features/profile/components/ChangePasswordForm';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial fetch

  const [userInfo, setUserInfo] = useState(null);
  const [tempUserInfo, setTempUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
        }
        const response = await getUserProfile(token);
        setUserInfo(response.data.user);
        setTempUserInfo(response.data.user);
      } catch (error) {
        setApiError(error.message || "Không thể tải thông tin người dùng.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSaveProfile = async () => {
    setApiError('');
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Vui lòng đăng nhập lại.");
      
      const response = await updateUserProfile(token, tempUserInfo);
      setUserInfo(response.data.user);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setIsEditing(false);

    } catch (error) {
      setApiError(error.message || 'Cập nhật thất bại.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setTempUserInfo({ ...userInfo });
    setIsEditing(false);
  };

  const handleChangePassword = async (passwordData) => {
    setApiError('');
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Vui lòng đăng nhập lại.");
      
      const response = await updateMyPassword(token, passwordData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      if (response.token) {
        localStorage.setItem('token', response.token);
      }
    } catch (error) {
      setApiError(error.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />

      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg flex items-center space-x-3 animate-slide-in">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">Cập nhật thành công!</p>
        </div>
      )}

      {apiError && (
        <div className="fixed top-20 right-4 z-50 bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg flex items-center space-x-3 animate-slide-in">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-800 font-medium">{apiError}</p>
          <button onClick={() => setApiError('')}><X className="w-5 h-5 text-red-700" /></button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {userInfo && (
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mx-auto overflow-hidden">
                      {tempUserInfo.avatar ? (
                        <img src={tempUserInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        userInfo.displayName.charAt(0).toUpperCase()
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setTempUserInfo(prev => ({ ...prev, avatar: reader.result }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mt-4">{userInfo.displayName}</h2>
                  <p className="text-sm text-gray-500">{userInfo.email}</p>
                </div>
              )}
              <nav className="space-y-2">
                <button onClick={() => setActiveTab('info')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'info' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <User className="w-5 h-5" />
                  <span className="font-medium">Thông tin cá nhân</span>
                </button>
                <button onClick={() => setActiveTab('security')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Bảo mật</span>
                </button>
                <Link to="/statistics" className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition text-gray-700 hover:bg-gray-50">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">Thống kê</span>
                </Link>
                <Link to="/studyreminder" className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition text-gray-700 hover:bg-gray-50">
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Nhắc nhở học tập</span>
                </Link>
              </nav>
            </div>
          </div>
          <div className="lg:col-span-3">
            {activeTab === 'info' && userInfo && (
              <UserInfo
                userInfo={userInfo}
                tempUserInfo={tempUserInfo}
                setTempUserInfo={setTempUserInfo}
                isEditing={isEditing}
                isSaving={isSaving}
                handleSaveProfile={handleSaveProfile}
                handleCancelEdit={handleCancelEdit}
                setIsEditing={setIsEditing}
              />
            )}
            {activeTab === 'security' && (
              <ChangePasswordForm
                isSaving={isSaving}
                handleChangePassword={handleChangePassword}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
