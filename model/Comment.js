import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    share: {
        type: [String],
        default: []
    },
    textComment: {
        type: String,
        require: true,
        min: 1
    },
    likes: {
        type: [String],
        default: []
    }
},{timestamps: true})

const CommentModel = mongoose.model("Comment", CommentSchema)

export default CommentModel