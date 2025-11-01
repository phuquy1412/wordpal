import express from 'express';
import { register, login,
     forgotPassword,resetPassword } from '../controllers/authControllers.js';

const router = express.Router();

// Endpoint (địa chỉ) cho chức năng Đăng ký
router.post('/register', register);

// Endpoint (địa chỉ) cho chức năng Đăng nhập
router.post('/login', login);

// API để yêu cầu link reset (gửi email)
router.post('/forgot-password', forgotPassword);

// API để đặt lại mật khẩu (khi user click link)
// :token là một tham số động, chứa token từ email
router.patch('/reset-password/:token', resetPassword)

export default router;