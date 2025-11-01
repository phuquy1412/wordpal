import express from 'express';
import usersRouter from './routers/usersRouters.js';
import authRouter from './routers/authRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
<<<<<<< HEAD
import cors from 'cors';
=======
import cors from "cors"; 
>>>>>>> 43ebbf34c724f596be25edc3386c8121fbb71b6a

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // chỉ cho phép frontend React truy cập
  credentials: true, // nếu dùng cookie/session thì bật
}));
<<<<<<< HEAD

=======
>>>>>>> 43ebbf34c724f596be25edc3386c8121fbb71b6a
app.use(express.json());

app.use("/api/user",usersRouter);
app.use("/api/auth",authRouter);

connectDB().then(() =>{
    app.listen(PORT,() =>{
    console.log("Server đang chạy trên cổng ${PORT}");
});
});



