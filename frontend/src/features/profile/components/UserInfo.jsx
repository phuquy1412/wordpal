import React from 'react';
import { Save, Edit2, X } from 'lucide-react';

export default function UserInfo({ 
    userInfo, 
    tempUserInfo, 
    setTempUserInfo, 
    isEditing, 
    isSaving, 
    handleSaveProfile, 
    handleCancelEdit,
    setIsEditing
}) {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    // Hàm định dạng ngày
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    return (
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
                            name="displayName"
                            value={tempUserInfo.displayName || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none ${
                                isEditing 
                                ? 'border-gray-200 focus:border-blue-500' 
                                : 'border-gray-100 bg-gray-50 text-gray-600'
                            }`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={tempUserInfo.email || ''}
                            onChange={handleInputChange}
                            disabled={true} // Email không nên cho sửa
                            className="w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none border-gray-100 bg-gray-50 text-gray-600"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Ngày tham gia:</span>
                        <span className="font-semibold text-gray-900">{formatDate(userInfo.createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}