import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";

//configuration
const app = express();
const port = 3000;
connectDB();
connectCloudinary();
const allowedOrigins = ['http://localhost:5173']

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

//endpoints
app.use('/api/user', userRouter);
app.use('/api/appointment', doctorRouter)


app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
})