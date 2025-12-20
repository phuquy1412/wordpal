import StudySchedule from '../model/StudySchedule.js';
import User from '../model/User.js';
import sendEmail from '../utils/email.js';

const CHECK_INTERVAL = 60 * 1000; // Kiểm tra mỗi 60 giây

const checkAndSendReminders = async () => {
    try {
        console.log("...Đang kiểm tra lịch học để gửi nhắc nhở...");
        
        const now = new Date();
        
        // 1. Tìm các lịch chưa hoàn thành và chưa gửi mail
        // Lưu ý: Chúng ta lấy dư ra một chút để lọc bằng code cho chính xác
        const schedules = await StudySchedule.find({
            isCompleted: false,
            isReminderSent: false
        }).populate('user').populate('topic');

        for (const schedule of schedules) {
            // 2. Tính toán thời gian nhắc nhở chính xác
            // schedule.scheduledDate là Date (thường là 00:00:00 của ngày đó)
            // schedule.scheduledTime là String "HH:MM"
            
            const [hours, minutes] = schedule.scheduledTime.split(':').map(Number);
            
            const scheduledDateTime = new Date(schedule.scheduledDate);
            scheduledDateTime.setHours(hours, minutes, 0, 0); // Gán giờ phút vào ngày

            // Thời gian cần nhắc = Thời gian học - (phút nhắc trước * 60000)
            const reminderTime = new Date(scheduledDateTime.getTime() - (schedule.reminderBefore * 60000));

            // 3. So sánh: Nếu hiện tại >= thời gian nhắc VÀ chưa quá hạn quá lâu (ví dụ 1 tiếng)
            // Để tránh việc server tắt bật lại gửi spam các mail cũ quá lâu
            const oneHour = 60 * 60 * 1000;
            
            if (now >= reminderTime && now < (new Date(reminderTime.getTime() + oneHour))) {
                
                // 4. Gửi Email
                if (schedule.user && schedule.user.email) {
                    try {
                        const message = `
Xin chào ${schedule.user.username || 'bạn'},

Đây là lời nhắc từ WordPal: Buổi học của bạn cho chủ đề "${schedule.topic.name}" sẽ bắt đầu vào lúc ${schedule.scheduledTime} hôm nay.

Ghi chú: ${schedule.notes || 'Không có'}

Hãy chuẩn bị sẵn sàng nhé!
Chúc bạn học tốt,
WordPal Team
                        `;

                        await sendEmail({
                            email: schedule.user.email,
                            subject: `[WordPal] Nhắc nhở lịch học: ${schedule.topic.name}`,
                            message: message
                        });

                        console.log(`Đã gửi mail nhắc nhở tới: ${schedule.user.email}`);

                        // 5. Cập nhật trạng thái đã gửi
                        schedule.isReminderSent = true;
                        await schedule.save();

                    } catch (emailError) {
                        console.error(`Gửi mail thất bại cho user ${schedule.user.email}:`, emailError);
                    }
                }
            }
        }

    } catch (error) {
        console.error("Lỗi trong quá trình kiểm tra nhắc nhở:", error);
    }
};

export const startReminderScheduler = () => {
    // Chạy ngay lần đầu
    checkAndSendReminders();
    
    // Thiết lập chu kỳ
    setInterval(checkAndSendReminders, CHECK_INTERVAL);
    console.log("Service nhắc nhở lịch học đã được khởi động.");
};
