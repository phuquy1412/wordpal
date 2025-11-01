// src/utils/email.js
import nodemailer from 'nodemailer';
import 'dotenv/config';

const sendEmail = async (options) => {
    // 1. Tạo transporter cho Gmail
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // Port 587 dùng STARTTLS nên 'secure' là 'false'
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 2. Định nghĩa các tùy chọn email
    const mailOptions = {
        // (Quan trọng) 'from' PHẢI là email bạn dùng để gửi
        from: `WordPal Admin <${process.env.EMAIL_USERNAME}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    // 3. Gửi email
    await transporter.sendMail(mailOptions);
};

export default sendEmail;