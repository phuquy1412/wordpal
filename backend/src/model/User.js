import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    displayName: { 
        type: String,
        trim: true
    },
    profilePicture: { // URL ảnh đại diện
        type: String,
        default: 'URL_TO_DEFAULT_AVATAR'
    },
    role: { 
    type: String,
    enum: ['student', 'teacher'],
    default: 'student' 
    },
    isVerified: { // Đã xác minh email/tài khoản chưa
        type: Boolean,
        default: false
    },
    // Bắt đầu các trường cho chức năng Quên Mật Khẩu
    passwordResetToken: String, // Có thể để đơn giản là String
    passwordResetExpires: Date  // Kiểu Date để dễ dàng so sánh thời gian
},
 {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

const User = mongoose.model('User', userSchema);
export default User;