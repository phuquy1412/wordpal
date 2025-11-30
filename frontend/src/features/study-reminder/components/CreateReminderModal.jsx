import { useState } from 'react';
import { X, Bell, Clock, BookOpen, Calendar, Mail, MessageSquare, Repeat } from 'lucide-react';

const CreateReminderModal = ({ isOpen, onClose, onCreateReminder, decks = [] }) => {
  const [formData, setFormData] = useState({
    deckId: '',
    deckTitle: '',
    time: '',
    days: [],
    notifyEmail: true,
    notifyPush: true,
    message: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const weekDays = [
    { value: 'mon', label: 'T2', full: 'Thứ 2' },
    { value: 'tue', label: 'T3', full: 'Thứ 3' },
    { value: 'wed', label: 'T4', full: 'Thứ 4' },
    { value: 'thu', label: 'T5', full: 'Thứ 5' },
    { value: 'fri', label: 'T6', full: 'Thứ 6' },
    { value: 'sat', label: 'T7', full: 'Thứ 7' },
    { value: 'sun', label: 'CN', full: 'Chủ nhật' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDayToggle = (day) => {
    const newDays = formData.days.includes(day)
      ? formData.days.filter(d => d !== day)
      : [...formData.days, day];
    handleChange('days', newDays);
  };

  const handleSelectAllDays = () => {
    if (formData.days.length === 7) {
      handleChange('days', []);
    } else {
      handleChange('days', weekDays.map(d => d.value));
    }
  };

  const handleSelectWeekdays = () => {
    handleChange('days', ['mon', 'tue', 'wed', 'thu', 'fri']);
  };

  const handleDeckChange = (deckId) => {
    const selectedDeck = decks.find(d => d.id === parseInt(deckId));
    setFormData(prev => ({
      ...prev,
      deckId,
      deckTitle: selectedDeck ? selectedDeck.title : ''
    }));
    if (errors.deckId) {
      setErrors(prev => ({ ...prev, deckId: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.deckId) {
      newErrors.deckId = 'Vui lòng chọn bộ thẻ';
    }
    if (!formData.time) {
      newErrors.time = 'Vui lòng chọn giờ nhắc nhở';
    }
    if (formData.days.length === 0) {
      newErrors.days = 'Vui lòng chọn ít nhất 1 ngày';
    }
    if (!formData.notifyEmail && !formData.notifyPush) {
      newErrors.notification = 'Vui lòng chọn ít nhất 1 phương thức thông báo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const reminderData = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    onCreateReminder(reminderData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      deckId: '',
      deckTitle: '',
      time: '',
      days: [],
      notifyEmail: true,
      notifyPush: true,
      message: '',
      isActive: true
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Tạo nhắc nhở học tập</h2>
                <p className="text-sm text-gray-600">Đặt lịch ôn bài đều đặn</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Select Deck */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Chọn bộ thẻ cần ôn <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.deckId}
                onChange={(e) => handleDeckChange(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none ${
                  errors.deckId ? 'border-red-300' : 'border-gray-200'
                }`}
              >
                <option value="">-- Chọn bộ thẻ --</option>
                {decks.map((deck) => (
                  <option key={deck.id} value={deck.id}>
                    {deck.title} ({deck.totalCards} thẻ)
                  </option>
                ))}
              </select>
            </div>
            {errors.deckId && (
              <p className="mt-1 text-sm text-red-600">{errors.deckId}</p>
            )}
          </div>

          {/* Select Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thời gian nhắc nhở <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                  errors.time ? 'border-red-300' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.time && (
              <p className="mt-1 text-sm text-red-600">{errors.time}</p>
            )}
          </div>

          {/* Select Days */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700">
                Chọn ngày trong tuần <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleSelectWeekdays}
                  className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  T2-T6
                </button>
                <button
                  type="button"
                  onClick={handleSelectAllDays}
                  className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  {formData.days.length === 7 ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day) => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => handleDayToggle(day.value)}
                  className={`py-3 rounded-xl font-semibold transition-all ${
                    formData.days.includes(day.value)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={day.full}
                >
                  {day.label}
                </button>
              ))}
            </div>
            {errors.days && (
              <p className="mt-2 text-sm text-red-600">{errors.days}</p>
            )}
          </div>

          {/* Notification Methods */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-200">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Phương thức thông báo</h3>
            </div>

            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-xs text-gray-600">Gửi email nhắc nhở</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('notifyEmail', !formData.notifyEmail)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    formData.notifyEmail ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      formData.notifyEmail ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Push Notification */}
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">Thông báo đẩy</p>
                    <p className="text-xs text-gray-600">Thông báo trên trình duyệt</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('notifyPush', !formData.notifyPush)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    formData.notifyPush ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      formData.notifyPush ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            {errors.notification && (
              <p className="mt-2 text-sm text-red-600">{errors.notification}</p>
            )}
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tin nhắn tùy chỉnh (không bắt buộc)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Ví dụ: Đã đến giờ ôn bài rồi! Hãy dành 15 phút học tập thôi nào 💪"
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Để trống để sử dụng tin nhắn mặc định
            </p>
          </div>

          {/* Preview */}
          {formData.deckId && formData.time && formData.days.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-5 border border-green-200">
              <p className="text-sm font-semibold text-green-800 mb-3 flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Xem trước nhắc nhở</span>
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">📚 Bộ thẻ:</span> {formData.deckTitle}
                </p>
                <p>
                  <span className="font-medium">⏰ Thời gian:</span> {formData.time}
                </p>
                <p>
                  <span className="font-medium">📅 Lặp lại:</span>{' '}
                  {formData.days.map(d => weekDays.find(wd => wd.value === d)?.label).join(', ')}
                </p>
                <p className="flex items-center space-x-2">
                  <span className="font-medium">🔔 Thông báo qua:</span>
                  <span className="flex space-x-1">
                    {formData.notifyEmail && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Email</span>
                    )}
                    {formData.notifyPush && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">Push</span>
                    )}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl flex space-x-3">
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Bell className="w-5 h-5" />
            <span>Tạo nhắc nhở</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CreateReminderModal;