import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function ChangePasswordForm({ isSaving, handleChangePassword }) {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    });
    const [errors, setErrors] = useState({});

    const handlePasswordInputChange = (e) => {
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
        if (passwordData.newPassword !== passwordData.newPasswordConfirm) {
            newErrors.newPasswordConfirm = 'Mật khẩu xác nhận không khớp';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validatePasswordForm()) return;
        handleChangePassword(passwordData);
    };

    return (
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
                        onChange={handlePasswordInputChange}
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
                        onChange={handlePasswordInputChange}
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
                        name="newPasswordConfirm"
                        value={passwordData.newPasswordConfirm}
                        onChange={handlePasswordInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none focus:border-blue-500 ${
                            errors.newPasswordConfirm ? 'border-red-300' : 'border-gray-200'
                        }`}
                    />
                    {errors.newPasswordConfirm && (
                        <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.newPasswordConfirm}</span>
                        </p>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {isSaving ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                </button>
            </div>
        </div>
    );
}