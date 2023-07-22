import mongoose from "mongoose";
import ChatModel from "../model/Chat.js";

const ChatController = {
    createChat: async (req, res) => {
        try {
            const newChat = await ChatModel.create(
                {
                    members: [req.body.sendUser, req.body.recivedUser]
                }
            )
            const dataChat = await newChat.save()
            res.status(201).json({dataChat})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: error })
        }
    },
    userChat: async (req, res) => {
        try {
            const userChat = await ChatModel.find({
                members: { $in: [req.params.id] }
            })
            res.status(200).json({userChat})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: error })
        }
    },
    getChat: async (req, res) => {
        try {
            const findChat = await ChatModel.find({
                members: { $all: [req.params.firstId, req.params.secondId]}
            })
            res.status(200).json({findChat})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: error })
        }
    }
}

export default ChatController