import express from 'express';
import usersRouter from './routers/usersRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();


app.use(express.json());

app.use("/api/user",usersRouter);

connectDB().then(() =>{
    app.listen(PORT,() =>{
    console.log("Server đang chạy trên cổng ${PORT}");
});
});



