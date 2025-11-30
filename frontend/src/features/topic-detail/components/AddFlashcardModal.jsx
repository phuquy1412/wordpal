// src/features/topic-detail/components/AddFlashcardModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddFlashcardModal = ({ isOpen, onClose, onAddCard }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [example, setExample] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [imageUrl, setImageUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!front || !back) {
      alert('Mặt trước và mặt sau không được để trống.');
      return;
    }
    onAddCard({
      id: Date.now(), // Temporary ID
      front,
      back,
      pronunciation,
      example,
      difficulty,
      imageUrl,
      audioUrl,
    });
    // Reset form and close modal
    setFront('');
    setBack('');
    setPronunciation('');
    setExample('');
    setDifficulty('medium');
    setImageUrl('');
    setAudioUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Thêm thẻ mới</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="front" className="block text-sm font-medium text-gray-700 mb-1">Mặt trước (Thuật ngữ)</label>
                <input type="text" id="front" value={front} onChange={(e) => setFront(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="back" className="block text-sm font-medium text-gray-700 mb-1">Mặt sau (Định nghĩa)</label>
                <input type="text" id="back" value={back} onChange={(e) => setBack(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label htmlFor="pronunciation" className="block text-sm font-medium text-gray-700 mb-1">Phát âm</label>
              <input type="text" id="pronunciation" value={pronunciation} onChange={(e) => setPronunciation(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
                <label htmlFor="example" className="block text-sm font-medium text-gray-700 mb-1">Ví dụ</label>
                <textarea id="example" value={example} onChange={(e) => setExample(e.target.value)} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL Hình ảnh</label>
                <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
                <label htmlFor="audioUrl" className="block text-sm font-medium text-gray-700 mb-1">URL Âm thanh</label>
                <input type="text" id="audioUrl" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">Độ khó</label>
                <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    <option value="easy">Dễ</option>
                    <option value="medium">Trung bình</option>
                    <option value="hard">Khó</option>
                </select>
            </div>
          </div>
          <div className="flex justify-end p-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-6 py-2 mr-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Hủy</button>
            <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Thêm thẻ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlashcardModal;
