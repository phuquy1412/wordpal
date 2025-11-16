import jwt from 'jsonwebtoken';
import User from '../model/User.js'; // Đảm bảo đường dẫn này chính xác
import "dotenv/config";

/**
 * Middleware 'protect'
 * * Mục đích: Bảo vệ các route yêu cầu đăng nhập.
 * * Cách hoạt động:
 * 1. Đọc token từ Header 'Authorization'.
 * 2. Xác thực token (dùng JWT_SECRET).
 * 3. Tìm user trong DB bằng ID được giải mã từ token.
 * 4. Gắn 'user' tìm được vào 'req.user'.
 * 5. Nếu thất bại (không token, token sai, user không tồn tại), trả về lỗi 401.
 */
export const protect = async (req, res, next) => {
    let token;

    // 1. Kiểm tra xem Header 'Authorization' có tồn tại và bắt đầu bằng 'Bearer' không
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Tách lấy chuỗi token (bỏ chữ 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // 3. Xác thực (verify) token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 'decoded' bây giờ là payload mà chúng ta đã ký (ví dụ: { id: '...' })

            // 4. Tìm người dùng trong DB bằng ID từ token
            // Chúng ta dùng .select('-password') để loại bỏ trường mật khẩu khỏi kết quả
            const foundUser = await User.findById(decoded.id).select('-password');

            // 5. Kiểm tra nếu user vẫn còn tồn tại
            if (!foundUser) {
                return res.status(401).json({ 
                    message: 'Người dùng thuộc về token này không còn tồn tại.' 
                });
            }

            // 6. GẮN USER VÀO REQ (ĐÂY LÀ BƯỚC QUAN TRỌNG NHẤT)
            // Đây là bước sửa lỗi 'req.user is undefined'
            req.user = foundUser;

            // 7. Cho phép đi tiếp sang controller tiếp theo (ví dụ: getUserLists)
            next();

        } catch (error) {
            // Xử lý các lỗi JWT
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token đã hết hạn. Vui lòng đăng nhập lại.' });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Token không hợp lệ. Vui lòng đăng nhập lại.' });
            }
            // Ghi log lỗi để debug
            console.error("LỖI XÁC THỰC TOKEN:", error);
            res.status(500).json({ message: 'Lỗi server khi xác thực token.' });
        }
    }

    // 7. Xử lý nếu không có token nào được cung cấp
    if (!token) {
        return res.status(401).json({ 
            message: 'Không được phép. Vui lòng cung cấp token (Header Authorization).' 
        });
    }
};