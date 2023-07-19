import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        min:8
    },
    following: {
        type: [String],
        default: []
    },
    follower: {
        type: [String],
        default:[]
    },
    profileimg: {
        type: String,
        default: ""
    },
    info: {
        type: String,
        default: ''
    },
    markpost: {
        type: Array,
        default: []
    }
}, {timestamps: true})


const UserModel = mongoose.model("User", UserSchema)

export default UserModel