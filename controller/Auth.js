import UserModel from "../model/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import asyncHandle from 'express-async-handler'

// const register = async (req, res) => {
//         try {
//             const checkMail = await UserModel.findOne({email: req.body.email})
//             if (checkMail) {
//                 res.status(400).json({mess: "Tài khoản đã tồn tại"})
//             }
//             else {
//                 const createSalt = await bcrypt.genSalt(20)
//                 const passwordHash = await bcrypt.hash(req.body.password, createSalt)
//                 const newUser = await UserModel.create({...req.body,password: passwordHash})

//                 return res.status(200).json({
//                     newUser
//                 })

//             }
//         } catch (error) {
//             res.status(400).json({error})
//         } hieu 3333333333333
//     }

const register = asyncHandle( async (req, res) => {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
        res.status(400).json({
            success : false
        })
    }
    const checkMailUser = await UserModel.findOne({email})
    if (checkMailUser) {
        throw new Error('Tài khoản đã tồn tại')
    }
    else {
        const newUser = await UserModel.create(req.body)
        return res.status(200).json({newUser})
    }
} )


export default register