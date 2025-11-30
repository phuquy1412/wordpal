import Topic from '../../model/Topic.js';

// @desc    Lấy tất cả chủ đề
// @route   GET /api/topics
// @access  Public
export const getAllTopics = async (req, res) => {
   try {
    const topics = await Topic.find().populate('creator', 'displayName');
    res.status(200).json(topics);
   } catch (error) {
    console.error("Lỗi khi gọi getAllTopics", error);
    res.status(500).json({message:"Lỗi máy chủ khi lấy danh sách chủ đề"}); 
   }
};

// @desc    Lấy một chủ đề bằng ID
// @route   GET /api/topics/:id
// @access  Public
export const getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id).populate('creator', 'displayName');

        if (!topic) {
            return res.status(404).json({ message: "Không tìm thấy chủ đề với ID đã cho." });
        }

        res.status(200).json(topic);
    } catch (error) {
        console.error("Lỗi khi gọi getTopicById", error);
        res.status(500).json({ message: "Lỗi máy chủ khi lấy thông tin chủ đề." });
    }
};


// @desc    Tạo chủ đề mới
// @route   POST /api/topics
// @access  Private (yêu cầu người dùng đăng nhập)
export const createTopic = async (req, res) => {
    try {
        const { name, description, isPublic, category, difficulty, thumbnail, tags } = req.body;
        
        // TODO: Thay thế ID này bằng ID của người dùng đã đăng nhập (req.user.id)
        // ID này chỉ dùng để tạm thời, cần có middleware xác thực để lấy ID thật
        const creator = "66a8553641c888960b73b530"; 

        if (!name) {
             return res.status(400).json({ message: "Tên chủ đề là bắt buộc." });
        }

        const newTopic = await Topic.create({
            name,
            description,
            creator,
            isPublic,
            category,
            difficulty,
            thumbnail,
            tags
        }); 

        res.status(201).json({
            status: 'success',
            data: {
                topic: newTopic 
            }
        });

    } catch (error) {
        console.error("Lỗi khi gọi createTopic:", error);
        res.status(500).json({message: "Lỗi máy chủ khi tạo chủ đề."});
    }
};

// @desc    Cập nhật chủ đề
// @route   PUT /api/topics/:id
// @access  Private (chỉ người tạo mới có quyền)
export const updateTopic = async (req, res) => {
    try {
        const topicId = req.params.id;
        const topic = await Topic.findById(topicId);

        if (!topic) {
            return res.status(404).json({ message: "Không tìm thấy chủ đề." });
        }

        // TODO: Thêm logic kiểm tra quyền: if (topic.creator.toString() !== req.user.id) ...
        
        const allowedUpdates = {
            name: req.body.name,
            description: req.body.description,
            isPublic: req.body.isPublic,
            category: req.body.category,
            difficulty: req.body.difficulty,
            thumbnail: req.body.thumbnail,
            tags: req.body.tags
        };

        const updateData = {};
        Object.keys(allowedUpdates).forEach(key => {
            if (req.body[key] !== undefined) {
                updateData[key] = allowedUpdates[key];
            }
        });
        
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Không có dữ liệu hợp lệ để cập nhật." });
        }

        const updatedTopic = await Topic.findByIdAndUpdate(
            topicId,
            updateData, 
            {
                new: true,
                runValidators: true 
            }
        );

        res.status(200).json({
            status: "success",
            data: {
                topic: updatedTopic
            }
        });
        
    } catch (error) {
        console.error("Lỗi khi gọi updateTopic:", error);
        res.status(500).json({ message: "Lỗi máy chủ khi cập nhật chủ đề." });
    }
};

// @desc    Xóa chủ đề
// @route   DELETE /api/topics/:id
// @access  Private (chỉ người tạo mới có quyền)
export const deleteTopic = async (req,res) => {
    try {
        const topicId = req.params.id;
        const topic = await Topic.findById(topicId);

        if (!topic) {
            return res.status(404).json({ message: "Không tìm thấy chủ đề." });
        }

        // TODO: Thêm logic kiểm tra quyền: if (topic.creator.toString() !== req.user.id) ...

        await Topic.findByIdAndDelete(topicId);
        
        res.status(204).json({
            status: "success",
            data: null
        });

    } catch (error) {
        console.error("Lỗi khi gọi deleteTopic:", error);
        res.status(500).json({message:"Lỗi máy chủ khi xóa chủ đề."});
    }
};
