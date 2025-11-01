import express from 'express';
import usersRouter from './routers/usersRouters.js';
import authRouter from './routers/authRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // chỉ cho phép frontend React truy cập
  credentials: true, // nếu dùng cookie/session thì bật
}));
app.use(express.json());

app.use("/api/user",usersRouter);
app.use("/api/auth",authRouter);

connectDB().then(() =>{
    app.listen(PORT,() =>{
    console.log("Server đang chạy trên cổng ${PORT}");
});
});



