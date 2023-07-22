import MessageModel from "../model/Message.js";

const MessageController = {
    addNewMessage: async (req, res) => {
        try {
            const {chatId, sendMessageId, message} = req.body
            const newMessage = await MessageModel.create({chatId, sendMessageId, message})
            const dataMessage = await newMessage.save()
            // console.log(newMessage)
            res.status(201).json(dataMessage)
        } catch (error) {
            console.log(error)
            res.status(500).json({status: error})
        }
    },
    getMessage: async (req, res) => {
        try {
            const dataMessage = await MessageModel.find({chatId: req.params.id})
            // console.log(dataMessage)
            res.status(200).json(dataMessage)
        } catch (error) {
            console.log(error)
            res.status(500).json({status: error})
        }
    }
}

export default MessageController