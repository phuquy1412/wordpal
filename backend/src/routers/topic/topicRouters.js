import express from 'express';
import {
    getAllTopics,
    getTopicById,
    createTopic,
    updateTopic,
    deleteTopic
} from '../../controllers/topic/topicControllers.js';

const router = express.Router();

// Middleware xác thực sẽ được thêm vào các route cần bảo vệ sau này
// ví dụ: router.route('/').post(protect, createTopic);

router.route('/')
    .get(getAllTopics)
    .post(createTopic);

router.route('/:id')
    .get(getTopicById)
    .put(updateTopic)
    .delete(deleteTopic);

export default router;
