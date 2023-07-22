import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    content: {
        require: true,
        type: String
    },
    title: {
        require: true,
        type: String
    },
    likes: {
        type: [String],
        default: []
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    photo: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    }
}, 
{timestamps: true})

const PostModel = mongoose.model("Post", PostSchema)
export default PostModel