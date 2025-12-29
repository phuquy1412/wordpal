import { useState, useEffect } from 'react';
import { Bell, Plus, Clock, Calendar, Mail, MessageSquare, BookOpen, MoreVertical, Edit, Trash2, Power, PowerOff, Zap } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CreateReminderModal from '../features/study-reminder/components/CreateReminderModal';
import { getMySchedulesApi, createScheduleApi, deleteScheduleApi, updateScheduleApi } from '../features/study-reminder/api/studyReminderApi';
import { getMyTopicsApi } from '../features/topic/api/topicApi';

const StudyReminderPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Giả sử token được lưu trong localStorage (hoặc lấy từ Context/Store)
  const token = localStorage.getItem('token'); 

  // Fetch dữ liệu ban đầu
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!token) return;

        const [schedulesData, topicsData] = await Promise.all([
            getMySchedulesApi(token),
            getMyTopicsApi(token)
        ]);

        // Transform dữ liệu topic để khớp với format của Modal (id, title, totalCards)
        const formattedTopics = topicsData.map(t => ({
            id: t._id,
            title: t.name,
            totalCards: t.totalCards || 0 // Backend cần trả về trường này hoặc tính toán
        }));

        setReminders(schedulesData);
        setTopics(formattedTopics);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleCreateReminder = async (newReminderData) => {
      try {
          const createdSchedule = await createScheduleApi(newReminderData, token);
          // Refresh list hoặc thêm trực tiếp vào state
          setReminders(prev => [...prev, { ...createdSchedule, topic: topics.find(t => t.id === createdSchedule.topic) }]);
          
          // Reload lại trang để lấy dữ liệu populate đầy đủ từ backend (như topic name)
          // Hoặc gọi lại fetch
          const data = await getMySchedulesApi(token);
          setReminders(data);

          alert("Đã tạo lịch học thành công!");
      } catch (err) {
          alert(err.message);
      }
  };

  const handleToggleActive = async (id, currentStatus) => {
    // Lưu ý: Backend hiện tại chưa có trường 'isActive' để tắt/bật
    // Mà chỉ có 'isCompleted'. 
    // Nếu muốn tạm dừng nhắc nhở, ta có thể thêm logic update hoặc coi 'isCompleted=true' là tắt.
    // Ở đây tạm thời ta sẽ update 'isCompleted'
    try {
        await updateScheduleApi(id, { isCompleted: !currentStatus }, token);
        setReminders(reminders.map(r => 
            r._id === id ? { ...r, isCompleted: !currentStatus } : r
        ));
    } catch (err) {
        alert("Lỗi khi cập nhật trạng thái: " + err.message);
    }
  };

  const handleDeleteReminder = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa nhắc nhở này?')) {
      try {
          await deleteScheduleApi(id, token);
          setReminders(reminders.filter(r => r._id !== id));
      } catch (err) {
          alert("Lỗi khi xóa: " + err.message);
      }
    }
  };

  // Helper để hiển thị ngày
  // Vì backend đang lưu ngày cụ thể (scheduledDate), ta cần hiển thị thứ của ngày đó
  const getDayLabelFromDate = (dateString) => {
      const date = new Date(dateString);
      const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      return days[date.getDay()];
  };

  const activeReminders = reminders.filter(r => !r.isCompleted).length;
  // Tính toán đơn giản cho demo
  const totalNotifications = activeReminders; 

  if (loading) return <div className="p-8 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden md:inline">Tạo nhắc nhở</span>
              </button>
          </div>
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
                  <p className="text-sm text-gray-600 font-medium">Thông báo sắp tới</p>
                </div>
              </div>

              {/* Reminder Cards */}
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div
                    key={reminder._id}
                    className={`bg-white rounded-2xl shadow-lg border-2 p-6 transition-all hover:shadow-xl ${
                      !reminder.isCompleted ? 'border-blue-200' : 'border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">
                              {reminder.topic?.name || 'Chủ đề không xác định'}
                          </h3>
                          {!reminder.isCompleted ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center space-x-1">
                              <Power className="w-3 h-3" />
                              <span>Đang bật</span>
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold flex items-center space-x-1">
                              <PowerOff className="w-3 h-3" />
                              <span>Đã xong</span>
                            </span>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 mb-3">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">{reminder.scheduledTime}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(reminder.scheduledDate).toLocaleDateString('vi-VN')} ({getDayLabelFromDate(reminder.scheduledDate)})
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {/* Mặc định hiển thị Email vì backend hỗ trợ email */}
                            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                              <Mail className="w-3 h-3" />
                              <span>Email</span>
                            </span>
                        </div>

                        {reminder.notes && (
                          <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg">
                            💬 "{reminder.notes}"
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          onClick={() => handleToggleActive(reminder._id, reminder.isCompleted)}
                          className={`p-2 rounded-lg transition-colors ${
                            !reminder.isCompleted
                              ? 'bg-green-100 text-green-600 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          title={!reminder.isCompleted ? 'Đánh dấu đã xong' : 'Kích hoạt lại'}
                        >
                          {!reminder.isCompleted ? (
                            <Power className="w-5 h-5" />
                          ) : (
                            <PowerOff className="w-5 h-5" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteReminder(reminder._id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
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
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      <CreateReminderModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateReminder={handleCreateReminder}
        decks={topics}
      />
    </div>
  );
};

export default StudyReminderPage;