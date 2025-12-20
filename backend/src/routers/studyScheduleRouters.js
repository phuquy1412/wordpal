import express from 'express';
import {
    createSchedule,
    getMySchedules,
    updateSchedule,
    deleteSchedule
} from '../controllers/studyScheduleControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Tất cả các route đều cần đăng nhập
router.use(protect);

router.route('/')
    .post(createSchedule)
    .get(getMySchedules);

router.route('/:id')
    .put(updateSchedule)
    .delete(deleteSchedule);

export default router;
