import express from 'express';
import { 
    register, 
    login,
    forgotPassword,
    resetPassword,
    updatePassword // 1. Import hàm mới
} from '../controllers/authControllers.js';
import { protect } from '../middlewares/authMiddleware.js'; // 2. Import middleware

const router = express.Router();

// --- Các Route không cần đăng nhập ---
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

// --- Các Route yêu cầu phải đăng nhập ---

// 3. Tạo route mới và dùng 'protect' middleware
// API để user tự đổi mật khẩu (khi đã đăng nhập)
router.patch('/update-my-password', protect, updatePassword);


export default router;