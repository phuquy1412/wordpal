import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { type } from 'os';
import { text } from 'stream/consumers';
import { ref } from 'process';

const recentlySearchedSchema = new mongoose.Schema(
    {
        wordId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Word',
            required: true
        },
        searchedAt: {
            type: Date,
            default: Date.now,
            required: true
        }
    }, { _id: false }
);

const flashcardSchema = new mongoose.Schema({
    wordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word',
        required: true
    },
    savedAt: {
        type: Date,
        default: Date.now,
        required: true
    }

},{_id: false});
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Vui lòng nhập email'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Vui lòng nhập mật khẩu'],
        select: false
    },
    displayName: {
        type: String,
        trim: true
    },
    profilePicture: { 
        type: String,
        default: 'URL_TO_DEFAULT_AVATAR'
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        default: 'student'
    },
    isVerified: { 
        type: Boolean,
        default: false
    },
    recentlySearched: [recentlySearchedSchema],//lịch sử tra cứu
    flashcards: [flashcardSchema],// danh sách flashcard đã lưu
    // Bắt đầu các trường cho chức năng Quên Mật Khẩu
    passwordResetToken: String, // Có thể để đơn giản là String
    passwordResetExpires: Date  // Kiểu Date để dễ dàng so sánh thời gian
},
    {
        timestamps: true // Tự động thêm createdAt và updatedAt
    });

//Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Đây là hàm tạo token reset
userSchema.methods.createPasswordResetToken = function () {
    // 1. Tạo một token ngẫu nhiên (đơn giản, không phải JWT)
    // Đây là token sẽ được gửi qua email
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 2. Băm (hash) token này và LƯU VÀO DATABASE
    // Chúng ta không lưu token gốc vào DB để tăng bảo mật
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // 3. Đặt thời gian hết hạn: 10 phút
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    // 4. Trả về token GỐC (để gửi qua email)
    return resetToken;
};

userSchema.index(
    {"recentlySearched.searchedAt": 1},
    {exprireAfterSeconsds: 86400}
);

const User = mongoose.model('User', userSchema);
export default User;