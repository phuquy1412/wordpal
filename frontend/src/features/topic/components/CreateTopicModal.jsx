import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

const CreateTopicModal = ({ isOpen, onClose, onCreateTopic }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreateTopic({
      name,
      description,
      isPrivate,
    });
    // Reset form and close modal
    setName('');
    setDescription('');
    setIsPrivate(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel */}
        <Dialog.Panel className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              Tạo chủ đề mới
            </Dialog.Title>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Topic Name */}
              <div>
                <label htmlFor="topic-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chủ đề *
                </label>
                <input
                  id="topic-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Từ vựng IELTS"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="topic-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả (không bắt buộc)
                </label>
                <textarea
                  id="topic-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Thêm mô tả ngắn gọn về chủ đề của bạn..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Privacy Toggle */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-800">Chế độ riêng tư</h4>
                  <p className="text-sm text-gray-500">Chỉ mình bạn có thể thấy chủ đề này.</p>
                </div>
                <label htmlFor="is-private" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id="is-private" 
                      className="sr-only" 
                      checked={isPrivate} 
                      onChange={() => setIsPrivate(!isPrivate)} 
                    />
                    <div className={`block w-14 h-8 rounded-full ${isPrivate ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isPrivate ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                Tạo chủ đề
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateTopicModal;