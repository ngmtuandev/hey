import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors';
import express from 'express'
import AuthRoute from './routes/AuthRoute.js'
import UserRouter from './routes/UserRouter.js'
import PostRouter from './routes/PostRouter.js'
import CommentRouter from './routes/CommentRouter.js'
import connectMogoose from "./connectmogoose.js";
import UploadImgRouter from './routes/UploadImgRouter.js'
import ChatRouter from './routes/ChatRouter.js'
import MessageRouter from './routes/MessageRouter.js'
mongoose.set('strictQuery', false);

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectMogoose()

app.use('/', AuthRoute)
app.use('/nguoidung', UserRouter)
app.use('/bai-dang', PostRouter)
app.use('/binh-luan', CommentRouter)
app.use('/dang-tai-anh', UploadImgRouter)
app.use('/tro-chuyen', ChatRouter)
app.use('/tin-nhan', MessageRouter)

// upload images to Public/images
app.use(express.static('Public'))
app.use('/images', express.static("images"))

app.listen(process.env.PORT, () => {
    console.log(`Connecting to ${process.env.PORT} Successfully`)
})