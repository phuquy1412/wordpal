import sendEmail from "./src/utils/email.js";

(async () => {
  try {
    console.log("📨 Đang thử gửi mail...");
    await sendEmail({
      email: "email_nhan_test@gmail.com", // đổi sang mail thật để test
      subject: "Test gửi mail",
      message: "Xin chào đại ca, mail này được gửi từ Node.js!"
    });
    console.log("✅ Gửi mail thành công!");
  } catch (err) {
    console.error("❌ Gửi mail thất bại!");
    console.error(err); // In toàn bộ lỗi ra terminal
  }
})();
