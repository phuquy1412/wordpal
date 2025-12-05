import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Grid, List, BookOpen } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TopicList from '../features/topic/components/TopicList'; // Đổi tên và đường dẫn
import CreateTopicModal from '../features/topic/components/CreateTopicModal'; // Đổi tên và đường dẫn
import { getMyTopicsApi, createTopicApi } from '../features/topic/api/topicApi.js';

const MyTopicPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      const token = localStorage.getItem('token'); // Giả sử token được lưu ở đây
      if (!token) {
        navigate('/login'); // Chuyển hướng nếu chưa đăng nhập
        return;
      }

      try {
        setLoading(true);
        const userTopics = await getMyTopicsApi(token);
        setTopics(userTopics);
        setError(null);
      } catch (err) {
        setError(err.message || 'Có lỗi xảy ra khi tải chủ đề.');
        setTopics([]); // Xóa dữ liệu cũ khi có lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [navigate]);

  const handleCreateTopic = async (topicData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Bạn cần đăng nhập để tạo chủ đề.");
      return;
    }

    try {
      const newTopic = await createTopicApi(topicData, token);
      setTopics([newTopic, ...topics]);
      setShowCreateModal(false); // Đóng modal sau khi tạo thành công
    } catch (err) {
      setError(err.message || 'Không thể tạo chủ đề. Vui lòng thử lại.');
      console.error("Error creating topic:", err);
    }
  };

  const handleSelectTopic = (topic) => {
    navigate(`/topics/${topic._id}`);
  };

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Chủ đề của tôi</h1>
          <p className="text-gray-600">Quản lý và học tập với các chủ đề của bạn</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm chủ đề..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* View Mode */}
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Create Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Tạo chủ đề</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        {loading && <p className="text-center">Đang tải chủ đề...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            {filteredTopics.length > 0 ? (
              <TopicList
                topics={filteredTopics}
                onSelectTopic={handleSelectTopic}
                viewMode={viewMode}
              />
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Chưa có chủ đề nào</h3>
                <p className="text-gray-600 mb-6">Tạo chủ đề đầu tiên để bắt đầu học!</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tạo chủ đề</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      {/* Create Modal */}
      <CreateTopicModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateTopic={handleCreateTopic}
      />
    </div>
  );
};

export default MyTopicPage;