import Topic from '../../model/Topic.js';
import Flashcard from '../../model/Flashcard.js';
import UserProgress from '../../model/UserProgress.js';
import mongoose from 'mongoose';

/**
 * @desc    Tạo một topic mới
 * @route   POST /api/topics
 * @access  Private
 */
export const createTopic = async (req, res) => {
    const { name, description, isPublic, category, difficulty, tags } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Tên chủ đề không được để trống' });
    }

    try {
        const topic = new Topic({
            name,
            description,
            isPublic: isPublic || false,
            creator: req.user._id, // Lấy từ middleware 'protect'
            category,
            difficulty,
            tags
        });

        const createdTopic = await topic.save();
        res.status(201).json(createdTopic);
    } catch (error) {
        console.error(`Lỗi khi tạo topic: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi tạo topic.' });
    }
};

/**
 * @desc    Lấy tất cả các topic do người dùng hiện tại tạo
 * @route   GET /api/topics/my-topics
 * @access  Private
 */
export const getMyTopics = async (req, res) => {
    try {
        const topics = await Topic.find({ creator: req.user._id }).sort({ createdAt: -1 });
        res.json(topics);
    } catch (error) {
        console.error(`Lỗi khi lấy topic của tôi: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách topic.' });
    }
};

/**
 * @desc    Lấy tất cả các topic public
 * @route   GET /api/topics/public
 * @access  Public
 */
export const getPublicTopics = async (req, res) => {
    try {
        // Có thể thêm phân trang ở đây sau
        const topics = await Topic.find({ isPublic: true })
            .sort({ totalLearners: -1, createdAt: -1 })
            .populate('creator', 'name avatar'); // Lấy thông tin cơ bản của người tạo

        res.json(topics);
    } catch (error) {
        console.error(`Lỗi khi lấy topic công khai: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách topic công khai.' });
    }
};


/**
 * @desc    Lấy thông tin chi tiết của một topic bằng ID
 * @route   GET /api/topics/:id
 * @access  Public (nếu topic isPublic) / Private (nếu là của người tạo)
 */
export const getTopicById = async (req, res) => {
    console.log("Backend Controller: Received request for topicId:", req.params.id); // DEBUGGING
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.error("Backend Controller: Invalid topicId format detected."); // DEBUGGING
            return res.status(400).json({ message: 'ID topic không hợp lệ' });
        }

        const topic = await Topic.findById(req.params.id);

        if (!topic) {
            return res.status(404).json({ message: 'Không tìm thấy topic' });
        }

        // Nếu topic không public, chỉ người tạo mới có quyền xem
        if (!topic.isPublic && (!req.user || topic.creator.toString() !== req.user._id.toString())) {
             return res.status(403).json({ message: 'Bạn không có quyền truy cập topic này' });
        }

        res.json(topic);
    } catch (error) {
        console.error(`Lỗi khi lấy chi tiết topic: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi lấy chi tiết topic.' });
    }
};

/**
 * @desc    Cập nhật thông tin topic
 * @route   PUT /api/topics/:id
 * @access  Private
 */
export const updateTopic = async (req, res) => {
    const { name, description, isPublic, category, difficulty, tags } = req.body;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID topic không hợp lệ' });
        }

        const topic = await Topic.findById(req.params.id);

        if (!topic) {
            return res.status(404).json({ message: 'Không tìm thấy topic' });
        }

        // Chỉ người tạo mới có quyền sửa
        if (topic.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa topic này' });
        }

        topic.name = name || topic.name;
        topic.description = description || topic.description;
        topic.isPublic = isPublic !== undefined ? isPublic : topic.isPublic;
        topic.category = category || topic.category;
        topic.difficulty = difficulty || topic.difficulty;
        topic.tags = tags || topic.tags;

        const updatedTopic = await topic.save();
        res.json(updatedTopic);
    } catch (error) {
        console.error(`Lỗi khi cập nhật topic: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi cập nhật topic.' });
    }
};

/**
 * @desc    Xóa một topic
 * @route   DELETE /api/topics/:id
 * @access  Private
 */
export const deleteTopic = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID topic không hợp lệ' });
        }

        const topic = await Topic.findById(req.params.id);

        if (!topic) {
            return res.status(404).json({ message: 'Không tìm thấy topic' });
        }

        // Chỉ người tạo mới có quyền xóa
        if (topic.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Bạn không có quyền xóa topic này' });
        }
        
        // Bắt đầu một transaction để đảm bảo tính toàn vẹn
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Xóa tất cả flashcards thuộc topic này
            await Flashcard.deleteMany({ topic: topic._id }, { session });

            // Xóa tất cả progress liên quan đến topic này
            await UserProgress.deleteMany({ topic: topic._id }, { session });

            // Xóa topic
            await Topic.deleteOne({ _id: topic._id }, { session });

            // Commit transaction
            await session.commitTransaction();
            
            res.json({ message: 'Topic và tất cả dữ liệu liên quan đã được xóa thành công' });

        } catch (error) {
            // Nếu có lỗi, rollback tất cả thay đổi
            await session.abortTransaction();
            throw error; // Ném lỗi ra ngoài để block catch bên ngoài xử lý
        } finally {
            session.endSession();
        }

    } catch (error) {
        console.error(`Lỗi khi xóa topic: ${error.message}`);
        res.status(500).json({ message: 'Lỗi server khi xóa topic.' });
    }
};