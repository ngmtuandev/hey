import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors';
import express from 'express'
import UserRoute from './routes/UserRoute.js'
import connectMogoose from "./connectmogoose.js";
mongoose.set('strictQuery', false);

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectMogoose()

app.use('/nguoidung', UserRoute)

app.listen(process.env.PORT, () => {
    console.log(`Connecting to ${process.env.PORT} Successfully`)
})