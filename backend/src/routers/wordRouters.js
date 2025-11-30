import express from 'express';
import { 
    suggestWords, 
    getWordDetail, 
    filterWords, 
    getUserLists,
    toggleFlashcard 
} from '../controllers/wordControllers.js';

/* * BƯỚC 1: Import middleware 'protect'
 * (Đảm bảo đường dẫn '../middlewares/auth.middleware.js' là chính xác)
 */
import { protect } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

// --- TÌM KIẾM & LỌC (Công khai - Không cần 'protect') ---
router.get('/suggest', suggestWords);
router.get('/', filterWords);

// --- CHỨC NĂNG NGƯỜI DÙNG (Bắt buộc xác thực) ---

/* * BƯỚC 2: Thêm 'protect' vào trước 'getUserLists'.
 * Đây là bước SỬA LỖI 'req.user is undefined'.
 */
router.get('/user/lists', protect, getUserLists); 

/* * BƯỚC 3: Thêm 'protect' vào trước 'toggleFlashcard'.
 */
router.post('/user/flashcard/:wordId', protect, toggleFlashcard); 

// --- CHI TIẾT TỪ VỰNG ---

/* * BƯOS 4: Thêm 'protect' vào trước 'getWordDetail'.
 * (Vì controller 'getWordDetail' cũng kiểm tra 'req.user' để lưu lịch sử)
 */
router.get('/:identifier', protect, getWordDetail);

export default router;