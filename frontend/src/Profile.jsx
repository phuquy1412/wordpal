import React, { useState } from 'react';
import { BookOpen, User, Mail, Lock, Camera, Save, Edit2, X, CheckCircle, AlertCircle, Award, TrendingUp, Calendar, Clock, Settings, LogOut, Bell, Shield } from 'lucide-react';

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [userInfo, setUserInfo] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    bio: 'Học sinh năm 3, đam mê học ngoại ngữ và khoa học',
    avatar: null,
    dateJoined: '15/01/2024',
    location: 'Hồ Chí Minh, Việt Nam'
  });

  const [tempUserInfo, setTempUserInfo] = useState({...userInfo});
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  // Stats data
  const stats = {
    totalSets: 24,
    totalCards: 486,
    studyStreak: 12,
    hoursStudied: 45,
    achievements: 8
  };

  // Study history
  const studyHistory = [
    { date: '30/10/2024', sets: 3, cards: 45, time: 35 },
    { date: '29/10/2024', sets: 2, cards: 30, time: 25 },
    { date: '28/10/2024', sets: 4, cards: 52, time: 42 },
    { date: '27/10/2024', sets: 2, cards: 28, time: 20 },
    { date: '26/10/2024', sets: 3, cards: 38, time: 30 }
  ];

  // Achievements
  const achievements = [
    { icon: '🔥', title: 'Streak Master', desc: '7 ngày học liên tục', unlocked: true },
    { icon: '🌟', title: 'First Steps', desc: 'Hoàn thành bộ thẻ đầu tiên', unlocked: true },
    { icon: '📚', title: 'Bookworm', desc: 'Học 100 thẻ', unlocked: true },
    { icon: '⚡', title: 'Speed Learner', desc: 'Hoàn thành 50 thẻ trong 1 giờ', unlocked: true },
    { icon: '🏆', title: 'Champion', desc: 'Đạt 100% trong 10 bộ thẻ', unlocked: false },
    { icon: '🎯', title: 'Perfectionist', desc: 'Đạt 100% trong 20 bộ thẻ', unlocked: false }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUserInfo(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!tempUserInfo.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!tempUserInfo.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(tempUserInfo.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (tempUserInfo.phone && !/^[0-9]{10}$/.test(tempUserInfo.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 8 ký tự';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    if (!validateProfileForm()) return;
    
    setIsSaving(true);
    setTimeout(() => {
      setUserInfo(tempUserInfo);
      setIsSaving(false);
      setIsEditing(false);
      setShowSuccess(true);
      
      // API call example:
      // fetch('http://localhost:5000/api/user/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(tempUserInfo)
      // });
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleCancelEdit = () => {
    setTempUserInfo({...userInfo});
    setIsEditing(false);
    setErrors({});
  };

  const handleChangePassword = () => {
    if (!validatePasswordForm()) return;
    
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      // API call example:
      // fetch('http://localhost:5000/api/user/change-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     currentPassword: passwordData.currentPassword,
      //     newPassword: passwordData.newPassword
      //   })
      // });
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">StudyHub</span>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 transition">
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg flex items-center space-x-3 animate-slide-in">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">Cập nhật thành công!</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mx-auto overflow-hidden">
                    {tempUserInfo.avatar ? (
                      <img src={tempUserInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      userInfo.fullName.charAt(0).toUpperCase()
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">{userInfo.fullName}</h2>
                <p className="text-sm text-gray-500">{userInfo.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'info' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Thông tin cá nhân</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'stats' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">Thống kê</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'achievements' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Thành tích</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'security' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Bảo mật</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'settings' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Cài đặt</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Personal Info Tab */}
            {activeTab === 'info' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Chỉnh sửa</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                      >
                        <X className="w-4 h-4" />
                        <span>Hủy</span>
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSaving ? 'Đang lưu...' : 'Lưu'}</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={tempUserInfo.fullName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none ${
                          isEditing 
                            ? 'border-gray-200 focus:border-blue-500' 
                            : 'border-gray-100 bg-gray-50 text-gray-600'
                        } ${errors.fullName ? 'border-red-300' : ''}`}
                      />
                      {errors.fullName && (
                        <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={tempUserInfo.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none ${
                          isEditing 
                            ? 'border-gray-200 focus:border-blue-500' 
                            : 'border-gray-100 bg-gray-50 text-gray-600'
                        } ${errors.email ? 'border-red-300' : ''}`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={tempUserInfo.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none ${
                          isEditing 
                            ? 'border-gray-200 focus:border-blue-500' 
                            : 'border-gray-100 bg-gray-50 text-gray-600'
                        } ${errors.phone ? 'border-red-300' : ''}`}
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Địa điểm
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={tempUserInfo.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none ${
                          isEditing 
                            ? 'border-gray-200 focus:border-blue-500' 
                            : 'border-gray-100 bg-gray-50 text-gray-600'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Giới thiệu bản thân
                    </label>
                    <textarea
                      name="bio"
                      value={tempUserInfo.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none resize-none ${
                        isEditing 
                          ? 'border-gray-200 focus:border-blue-500' 
                          : 'border-gray-100 bg-gray-50 text-gray-600'
                      }`}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Ngày tham gia:</span>
                      <span className="font-semibold text-gray-900">{userInfo.dateJoined}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Tab */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <BookOpen className="w-10 h-10 opacity-80" />
                      <span className="text-3xl font-bold">{stats.totalSets}</span>
                    </div>
                    <p className="text-blue-100">Bộ thẻ đã tạo</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="w-10 h-10 opacity-80" />
                      <span className="text-3xl font-bold">{stats.totalCards}</span>
                    </div>
                    <p className="text-purple-100">Thẻ đã học</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Award className="w-10 h-10 opacity-80" />
                      <span className="text-3xl font-bold">{stats.studyStreak}</span>
                    </div>
                    <p className="text-orange-100">Ngày học liên tục</p>
                  </div>
                </div>

                {/* Study History */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Lịch sử học tập</h3>
                  <div className="space-y-4">
                    {studyHistory.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{day.date}</p>
                            <p className="text-sm text-gray-600">{day.sets} bộ thẻ • {day.cards} thẻ</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{day.time} phút</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Thành tích của bạn</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border-2 transition ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{achievement.desc}</p>
                          {achievement.unlocked ? (
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">Đã mở khóa</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-gray-500">
                              <Lock className="w-4 h-4" />
                              <span className="text-sm font-medium">Chưa đạt được</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Đổi mật khẩu</h2>
                <div className="space-y-6 max-w-xl">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mật khẩu hiện tại
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none focus:border-blue-500 ${
                        errors.currentPassword ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    {errors.currentPassword && (
                      <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.currentPassword}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none focus:border-blue-500 ${
                        errors.newPassword ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    {errors.newPassword && (
                      <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.newPassword}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none focus:border-blue-500 ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.confirmPassword}</span>
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleChangePassword}
                    disabled={isSaving}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {isSaving ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                  </button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cài đặt</h2>
                <div className="space-y-6">
                  {/* Notifications */}
                  <div className="pb-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Bell className="w-5 h-5" />
                      <span>Thông báo</span>
                    </h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-medium text-gray-900">Email thông báo</p>
                          <p className="text-sm text-gray-600">Nhận thông báo qua email</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                      </label>
                      
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-medium text-gray-900">Nhắc nhở học tập</p>
                          <p className="text-sm text-gray-600">Nhận nhắc nhở hàng ngày</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                      </label>
                      
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-medium text-gray-900">Thông báo thành tích</p>
                          <p className="text-sm text-gray-600">Thông báo khi đạt thành tích mới</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                      </label>
                    </div>
                  </div>

                  {/* Privacy */}
                  <div className="pb-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Quyền riêng tư</span>
                    </h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-medium text-gray-900">Hồ sơ công khai</p>
                          <p className="text-sm text-gray-600">Cho phép người khác xem hồ sơ của bạn</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                      </label>
                      
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-medium text-gray-900">Hiển thị thống kê</p>
                          <p className="text-sm text-gray-600">Cho phép người khác xem thống kê học tập</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                      </label>
                    </div>
                  </div>

                  {/* Language & Display */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Giao diện</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ngôn ngữ
                        </label>
                        <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none">
                          <option value="vi">Tiếng Việt</option>
                          <option value="en">English</option>
                          <option value="ja">日本語</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chế độ hiển thị
                        </label>
                        <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none">
                          <option value="light">Sáng</option>
                          <option value="dark">Tối</option>
                          <option value="auto">Tự động</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">Vùng nguy hiểm</h3>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-3 border-2 border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition">
                        Xóa tất cả dữ liệu học tập
                      </button>
                      <button className="w-full px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition">
                        Xóa tài khoản vĩnh viễn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}