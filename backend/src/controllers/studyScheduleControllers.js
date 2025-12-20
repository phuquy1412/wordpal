import StudySchedule from '../model/StudySchedule.js';
import Topic from '../model/Topic.js';
import sendEmail from '../utils/email.js';

// --- 1. TẠO LỊCH HỌC MỚI ---
export const createSchedule = async (req, res) => {
    try {
        const { 
            topicId, 
            scheduledDate, 
            scheduledTime, 
            duration, 
            reminderBefore,
            notes 
        } = req.body;

        // Validation cơ bản
        if (!topicId || !scheduledDate || !scheduledTime) {
            return res.status(400).json({ message: "Vui lòng cung cấp Topic, Ngày và Giờ học." });
        }

        // Kiểm tra Topic tồn tại
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ message: "Topic không tồn tại." });
        }

        // Tạo lịch mới
        const newSchedule = new StudySchedule({
            user: req.user._id,
            topic: topicId,
            scheduledDate,
            scheduledTime,
            duration: duration || 30,
            reminderBefore: reminderBefore || 15,
            notes,
            isReminderSent: false
        });

        const savedSchedule = await newSchedule.save();

        const populatedSchedule = await StudySchedule
            .findById(savedSchedule._id)
            .populate('topic', 'name description');

        res.status(201).json(populatedSchedule);

    } catch (error) {
        console.error("Lỗi khi tạo lịch học:", error);
        res.status(500).json({ message: "Lỗi Server khi tạo lịch học." });
    }
};

// --- 2. LẤY DANH SÁCH LỊCH HỌC CỦA TÔI ---
export const getMySchedules = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Lấy lịch học, sắp xếp theo thời gian gần nhất
        // Populate thông tin Topic để hiển thị tên
        const schedules = await StudySchedule.find({ user: userId })
            .populate('topic', 'name description') 
            .sort({ scheduledDate: 1, scheduledTime: 1 });

        res.json(schedules);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách lịch học:", error);
        res.status(500).json({ message: "Lỗi Server khi lấy danh sách." });
    }
};

// --- 3. CẬP NHẬT TRẠNG THÁI HOẶC THÔNG TIN ---
export const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const schedule = await StudySchedule.findOne({ _id: id, user: req.user._id });

        if (!schedule) {
            return res.status(404).json({ message: "Không tìm thấy lịch học." });
        }

        // Nếu đánh dấu hoàn thành -> cập nhật completedAt
        if (updates.isCompleted && !schedule.isCompleted) {
            updates.completedAt = new Date();
        }

        // Cập nhật dữ liệu
        Object.keys(updates).forEach(key => {
            schedule[key] = updates[key];
        });

        // Nếu cập nhật lại thời gian, reset trạng thái gửi mail
        if (updates.scheduledDate || updates.scheduledTime) {
            schedule.isReminderSent = false;
        }

        const updatedSchedule = await schedule.save();
        res.json(updatedSchedule);

    } catch (error) {
        console.error("Lỗi khi cập nhật lịch học:", error);
        res.status(500).json({ message: "Lỗi Server khi cập nhật." });
    }
};

// --- 4. XÓA LỊCH HỌC ---
export const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSchedule = await StudySchedule.findOneAndDelete({ _id: id, user: req.user._id });

        if (!deletedSchedule) {
            return res.status(404).json({ message: "Không tìm thấy lịch học để xóa." });
        }

        res.json({ message: "Đã xóa lịch học thành công." });
    } catch (error) {
        console.error("Lỗi khi xóa lịch học:", error);
        res.status(500).json({ message: "Lỗi Server khi xóa." });
    }
};
