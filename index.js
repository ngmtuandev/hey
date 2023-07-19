import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors';
import express from 'express'
import AuthRoute from './routes/AuthRoute.js'
import UserRouter from './routes/UserRouter.js'
import PostRouter from './routes/PostRouter.js'
import CommentRouter from './routes/CommentRouter.js'
import connectMogoose from "./connectmogoose.js";
mongoose.set('strictQuery', false);

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectMogoose()

app.use('/', AuthRoute)
app.use('/nguoidung', UserRouter)
app.use('/bai-dang', PostRouter)
app.use('/binh-luan', CommentRouter)

app.listen(process.env.PORT, () => {
    console.log(`Connecting to ${process.env.PORT} Successfully`)
})