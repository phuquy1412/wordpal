import { useState } from 'react';
import { Bell, Plus, Clock, Calendar, Mail, MessageSquare, BookOpen, MoreVertical, Edit, Trash2, Power, PowerOff, Zap } from 'lucide-react';

const StudyReminderPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reminders, setReminders] = useState([
    {
      id: 1,
      deckId: 1,
      deckTitle: 'IELTS Vocabulary',
      time: '19:00',
      days: ['mon', 'wed', 'fri'],
      notifyEmail: true,
      notifyPush: true,
      message: '',
      isActive: true,
      createdAt: '2024-12-15'
    },
    {
      id: 2,
      deckId: 2,
      deckTitle: 'English Grammar',
      time: '20:00',
      days: ['tue', 'thu', 'sat'],
      notifyEmail: true,
      notifyPush: false,
      message: 'Học grammar đều đặn mỗi ngày!',
      isActive: true,
      createdAt: '2024-12-14'
    }
  ]);

  const decks = [
    { id: 1, title: 'IELTS Vocabulary', totalCards: 50 },
    { id: 2, title: 'English Grammar', totalCards: 30 },
    { id: 3, title: 'Math Formulas', totalCards: 40 }
  ];

  const weekDays = [
    { value: 'mon', label: 'T2', full: 'Thứ 2' },
    { value: 'tue', label: 'T3', full: 'Thứ 3' },
    { value: 'wed', label: 'T4', full: 'Thứ 4' },
    { value: 'thu', label: 'T5', full: 'Thứ 5' },
    { value: 'fri', label: 'T6', full: 'Thứ 6' },
    { value: 'sat', label: 'T7', full: 'Thứ 7' },
    { value: 'sun', label: 'CN', full: 'Chủ nhật' }
  ];

  const handleToggleActive = (id) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const handleDeleteReminder = (id) => {
    if (confirm('Bạn có chắc muốn xóa nhắc nhở này?')) {
      setReminders(reminders.filter(r => r.id !== id));
    }
  };

  const getDayLabels = (days) => {
    return days.map(d => weekDays.find(wd => wd.value === d)?.label).join(', ');
  };

  const activeReminders = reminders.filter(r => r.isActive).length;
  const totalNotifications = reminders.reduce((sum, r) => {
    return sum + (r.isActive ? r.days.length : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Nhắc nhở học tập</h1>
                <p className="text-sm text-gray-600">Đặt lịch ôn bài đều đặn mỗi ngày</p>
              </div>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline">Tạo nhắc nhở</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reminder List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <Bell className="w-8 h-8 text-blue-600" />
                  <span className="text-3xl font-bold text-blue-600">{reminders.length}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Tổng nhắc nhở</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <Power className="w-8 h-8 text-green-600" />
                  <span className="text-3xl font-bold text-green-600">{activeReminders}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Đang hoạt động</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="w-8 h-8 text-orange-600" />
                  <span className="text-3xl font-bold text-orange-600">{totalNotifications}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Thông báo/tuần</p>
              </div>
            </div>

            {/* Reminder Cards */}
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`bg-white rounded-2xl shadow-lg border-2 p-6 transition-all hover:shadow-xl ${
                    reminder.isActive ? 'border-blue-200' : 'border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{reminder.deckTitle}</h3>
                        {reminder.isActive ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center space-x-1">
                            <Power className="w-3 h-3" />
                            <span>Đang bật</span>
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold flex items-center space-x-1">
                            <PowerOff className="w-3 h-3" />
                            <span>Đã tắt</span>
                          </span>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{reminder.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{getDayLabels(reminder.days)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {reminder.notifyEmail && (
                          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                            <Mail className="w-3 h-3" />
                            <span>Email</span>
                          </span>
                        )}
                        {reminder.notifyPush && (
                          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                            <MessageSquare className="w-3 h-3" />
                            <span>Push</span>
                          </span>
                        )}
                      </div>

                      {reminder.message && (
                        <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg">
                          💬 "{reminder.message}"
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => handleToggleActive(reminder.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          reminder.isActive
                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title={reminder.isActive ? 'Tắt nhắc nhở' : 'Bật nhắc nhở'}
                      >
                        {reminder.isActive ? (
                          <Power className="w-5 h-5" />
                        ) : (
                          <PowerOff className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Next Reminder */}
                  {reminder.isActive && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        🔔 Nhắc nhở tiếp theo: <span className="font-semibold text-gray-700">Thứ 2, 19:00</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Empty State */}
              {reminders.length === 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Chưa có nhắc nhở nào</h3>
                  <p className="text-gray-600 mb-6">
                    Tạo nhắc nhở học tập để không bỏ lỡ buổi ôn bài nào
                  </p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Tạo nhắc nhở đầu tiên</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-yellow-200">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-600" />
                <h3 className="font-bold text-gray-800">Mẹo học tập</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 mt-0.5">💡</span>
                  <span>Học đều đặn 20-30 phút mỗi ngày tốt hơn học dồn</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 mt-0.5">💡</span>
                  <span>Đặt nhắc nhở vào khung giờ bạn thường rảnh</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 mt-0.5">💡</span>
                  <span>Ôn lại kiến thức cũ định kỳ để ghi nhớ lâu hơn</span>
                </li>
              </ul>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-800">Cài đặt thông báo</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Email</p>
                    <p className="text-xs text-gray-600">Nhận qua email</p>
                  </div>
                  <button className="relative w-12 h-6 bg-blue-600 rounded-full">
                    <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Push</p>
                    <p className="text-xs text-gray-600">Thông báo trình duyệt</p>
                  </div>
                  <button className="relative w-12 h-6 bg-blue-600 rounded-full">
                    <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Study Streak */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-green-200">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-800">Chuỗi học tập</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-green-600 mb-1">7</div>
                <p className="text-sm text-gray-600">ngày liên tiếp</p>
              </div>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div
                    key={day}
                    className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-green-700 font-medium mt-3">
                🔥 Tuyệt vời! Hãy tiếp tục!
              </p>
            </div>

            {/* Available Decks */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-800">Bộ thẻ có sẵn</h3>
              </div>
              <div className="space-y-2">
                {decks.map((deck) => (
                  <div
                    key={deck.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <p className="font-medium text-gray-800 text-sm">{deck.title}</p>
                    <p className="text-xs text-gray-600">{deck.totalCards} thẻ</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Create Reminder Modal</h3>
            <p className="text-gray-600 mb-4">
              Sử dụng component CreateReminderModal đã tạo ở trên
            </p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyReminderPage;