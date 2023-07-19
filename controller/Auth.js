import UserModel from "../model/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

export const register = asyncHandler( async (req, res) => {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
        res.status(400).json({
            success : false
        })
    }
    const userUser = await UserModel.findOne({email: req.body.email})
    if (userUser) {
        throw new Error('Tài khoản đã tồn tại')
    }
    else {

        const createSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, createSalt)

        const newUser = await UserModel.create({...req.body, password: passwordHash})

        const token = await jwt.sign({id: newUser._id}, process.env.JWT_KEY, {expiresIn: '5h'})
        console.log(passwordHash)
        console.log(newUser)

        return res.status(200).json({newUser, token})
    }
} )

export const login = asyncHandler( async (req, res) => {
    const { email } = req.body
    const user = await UserModel.findOne({ email})
    if (!user) {
        res.status(404).json({
            status: 'Tài khoản không tồn tại'
        })
    }

    const checkPassword = await bcrypt.compare(req.body.password, user.password )

    if (!checkPassword) {
        res.status(404).json({
            status: 'Mật khẩu bạn nhập không đúng'
        })
    }
    else {
        const token = await jwt.sign({id: user._id}, process.env.JWT_KEY, {expiresIn: '5h'})

        const {pass, ...dataUser} = user._doc

        console.log('user', user)
        console.log(dataUser)

        res.status(200).json({dataUser, token})

    }
})

