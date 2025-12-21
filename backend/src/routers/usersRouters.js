import express from 'express';
import {
     getAllUsers,
     createUser,
     deleteUser,
     updateUser,
     getMe,
     updateMe
} from '../controllers/usersControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router= express.Router();

// --- Routes cho user đã đăng nhập ---
// Phải đặt trước các route có ID động
router.use(protect); // Áp dụng middleware cho tất cả các route bên dưới
router.get('/me', getMe);
router.patch('/me', updateMe);


// --- Routes cho admin (Vẫn giữ nhưng đã được bảo vệ) ---
router.get("/",getAllUsers);
router.post("/",createUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);

export default router;
