import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
            require: true
        },
        sendMessageId: {
            type: String,
            require: true
        },
        message: {
            type: String,
            require: true
        }
    },
    {timestamps: true}
)

const MessageModel = mongoose.model('Message', MessageSchema)
export default MessageModel