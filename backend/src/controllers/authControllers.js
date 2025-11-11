import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";
import crypto from 'crypto';
import sendEmail from "../utils/email.js";
/**
 * HÀM TRỢ GIÚP: Tạo và Ký một JWT Token
 * Hàm này được dùng chung cho cả register và login
 * @param {string} id - ID của user từ MongoDB
 * @returns {string} - Chuỗi JWT đã được ký
 */

//Tạo token để đăng nhập
const signToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
};

//Hàm đăng kí tài khoản và tự động đăng nhập sau khi đăng kí thành công
export const register = async (req,res)=>{
    try {
        //Lấy thông tin của client nhập vào
        const {email, password, passwordConfirm, displayName}= req.body;
        //kiểm tra người dùng có bỏ trống ko
        if (!email||!password||!passwordConfirm||!displayName) {
            return res.status(400).json({
                message: "Vui lòng nhập đẩy đủ thông tin"
            });
        }
        //Kiểm tra xác nhận mật khẩu
        if (password !== passwordConfirm) {
            return res.status(400).json({
                message: "Mật khẩu và mật khẩu xác nhận không khớp"
            });
        }
        //Tạo user mới
        const newUser= await User.create({
            email: email,
            password: password,
            displayName: displayName
        }) 
        //Tạo token cho user mới để tự động đăng nhập
        const Token = signToken(newUser._id);
        //Gắn đánh dấu mật khẩu ko bị thây đổi
        newUser.password= undefined;
        //Thông báo tạo thành công
        res.status(201).json({
            status: 'success',
            Token,
            data: {user: newUser}
        });
    } catch (error) {
        if (error.code===11000) {
            return res.status(400).json({
                message: "Email này đã tồn tại. Vui lòng nhập email khác."  
            });
        }
        console.error("LỖI KHI ĐĂNG KÝ:", error); // Ghi lại lỗi ra console để debug
        res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
};

//Hàm Đăng nhập 
export const login = async (req,res)=>{
    try {
        const {email,password}= req.body;
        if (!email||!password) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin để đăng nhập"
            });
        }
        const user = await User.findOne({email}).select('+password');

        if(!user||!(await bcrypt.compare(password, user.password))){
            return res.status(401).json(
                {
                    message:"Email hoặc mật khẩu không đúng."
                }
            )
        }
        const token =signToken(user._id);
        user.password= undefined
        res.status(201).json({
            status: 'succes',
            token,
            data: {
                user
            }
        });
    } catch (error) {
        console.error("LỖI KHI ĐĂNG NHẬP:", error);
        res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
};

/**
 * CHỨC NĂNG 1: GỬI YÊU CẦU QUÊN MẬT KHẨU
 */
export const forgotPassword = async (req, res) => {
    try {
        // --- BƯỚC 1: TÌM USER BẰNG EMAIL ---
        const user = await User.findOne({ email: req.body.email });

        // Nếu không tìm thấy user, ta vẫn gửi thông báo thành công.
        // Đây là cách để hacker không thể "dò" xem email nào đã đăng ký.
        if (!user) {
            return res.status(200).json({ 
                message: 'Nếu email này tồn tại, bạn sẽ nhận được một link reset mật khẩu.' 
            });
        }

        // --- BƯỚC 2: TẠO TOKEN RESET ---
        // Gọi hàm (từ Bước 1) mà chúng ta đã thêm vào Model
        const resetToken = user.createPasswordResetToken();
        
        // Lưu user (với token đã băm và thời gian hết hạn)
        await user.save({ validateBeforeSave: false }); // Tắt validation khi lưu

        // --- BƯỚC 3: GỬI TOKEN QUA EMAIL ---
        
        // Tạo URL mà user sẽ click
        // (Quan trọng: 'localhost:3000' là địa chỉ React App (Frontend) của bạn)
        // Token gốc (resetToken) sẽ nằm trên URL
        const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

        // Nội dung email
        const message = `Bạn vừa yêu cầu reset mật khẩu. Vui lòng nhấn vào link sau để đặt lại mật khẩu của bạn (link chỉ có hiệu lực 10 phút): ${resetURL}`;

        // Gọi hàm sendEmail (từ file utils/email.js của bạn)
        await sendEmail({
            email: user.email,
            subject: 'Yêu cầu Reset Mật khẩu WordPal (Hiệu lực 10 phút)',
            message: message
        });

        // Gửi thông báo thành công
        res.status(200).json({
            status: 'success',
            message: 'Email reset mật khẩu đã được gửi.'
        });
    
    } catch (error) {
        // Nếu có lỗi, xóa token trong DB đi để user có thể thử lại
        // (Đây là code xử lý lỗi nâng cao)
         if (req.body.email) {
            const userToClear = await User.findOne({ email: req.body.email });
             if (userToClear) {
                userToClear.passwordResetToken = undefined;
                userToClear.passwordResetExpires = undefined;
                await userToClear.save({ validateBeforeSave: false });
             }
         }
        console.error("LỖI QUÊN MẬT KHẨU:", error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi gửi email, vui lòng thử lại sau.' });
    }
};


/**
 * CHỨC NĂNG 2: THỰC HIỆN RESET MẬT KHẨU
 */
export const resetPassword = async (req, res) => {
    try {
        // --- BƯỚC 1: LẤY TOKEN GỐC TỪ URL ---
        // (Frontend sẽ gửi token này từ URL param)
        const tokenTuEmail = req.params.token;
        
        // --- BƯỚC 2: BĂM (HASH) TOKEN NÀY LẠI ---
        // Phải băm giống hệt cách đã làm ở Bước 1 (trong Model)
        // để so sánh với token trong DB
        const hashedToken = crypto
            .createHash('sha256')
            .update(tokenTuEmail)
            .digest('hex');

        // --- BƯỚC 3: TÌM USER BẰNG TOKEN ĐÃ BĂM ---
        // Phải tìm user có token khớp VÀ token chưa hết hạn
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() } // $gt = greater than (thời gian hết hạn > thời gian hiện tại)
        });

        // --- BƯỚC 4: XỬ LÝ TOKEN KHÔNG HỢP LỆ ---
        // Nếu không tìm thấy user, nghĩa là token sai hoặc đã hết hạn 10 phút
        if (!user) {
            return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
        }

        // --- BƯỚC 5: LẤY MẬT KHẨU MỚI ---
        const { password, passwordConfirm } = req.body;

        if (!password || !passwordConfirm || password !== passwordConfirm) {
            return res.status(400).json({ message: 'Vui lòng nhập mật khẩu mới và xác nhận khớp.' });
        }

        // --- BƯỚC 6: CẬP NHẬT USER ---
        
        // 1. Cập nhật mật khẩu mới (dưới dạng thô)
        user.password = password; 
        
        // 2. Xóa token đi (để không thể dùng lại)
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        
        // 3. Lưu user (Lúc này, 'pre-save' hook sẽ tự động băm mật khẩu mới)
        await user.save();

        // --- BƯỚC 7: ĐĂNG NHẬP CHO USER ---
        // Tạo một token JWT mới để user được tự động đăng nhập
        const loginToken = signToken(user._id);

        res.status(200).json({
            status: 'success',
            token: loginToken, // Gửi token đăng nhập mới
            message: 'Cập nhật mật khẩu thành công!'
        });

    } catch (error) {
        console.error("LỖI RESET MẬT KHẨU:", error);
        res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
};  