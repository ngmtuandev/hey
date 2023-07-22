import mongoose from "mongoose";
import PostModel from "../model/Post.js";
import UserModel from "../model/User.js";

const PostController = {
    createPost: async (req, res) => {
        try {
            const userID = mongoose.Types.ObjectId(req.datatoken.id)
            // const userPost = await UserModel.findById(userID)
            const newPost = await PostModel.create({...req.body, user: userID})
            console.log('new posttt : ', newPost)
            if (!newPost) {
                res.status(401).json({status: 'Khong thể tạo bài đăng'})
            }
            else {

                res.status(200).json({
                    newPost
                })
            }
        } catch (error) {
            res.status(401).json({
                status: 'Đăng bài thất bại'
            })
        }
    },
    getUserPost: async (req, res) => {
        try {
            const userPosts = await PostModel.find({user: req.params.id}).populate('user')
            res.status(200).json({
                status: 'Lấy người dùng thành công',
                data: userPosts
            }) 
        } catch (error) {
            res.status(401).json({status: 'Lỗi'})
        }
    },
    updatePost: async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id)
            if (post.userpost.toString() === req.datatoken.id.toString())
            {
                const newPostUpdate = await PostModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
                res.status(200).json({
                    status: 'Cập nhập bài đăng thành công',
                    data: newPostUpdate
                })
            }
            else {
                res.status(401).json({status: 'Cập nhập bài đăng lỗi'})
            }
        } catch (error) {
            res.status(401).json({status: 'Lỗi'})
        }
    },
    deletePost: async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id)
            console.log(post)
            if (!post) {
                res.status(404).json({status: 'Không tồn tại bài viết này'})
            }
            else {
                // console.log('first')
                if (post?.user.toString() === req.datatoken.id) {
                    await PostModel.findByIdAndDelete(req.params.id)
                    res.status(200).json({
                        status: 'Xóa người dùng thành công'
                    })
                }
                else {
                    res.status(403).json({
                        status: 'Xóa người dùng thất bại'
                    })
                }
            }
        } catch (error) {
            res.status(401).json({
                status: 'Thất bại'
            
            })
        }
    },
    getTimeLinePost: async (req, res) => {
        try {
                const userCurrent = await UserModel.findById(req.datatoken.id)
                const postUserCurrent = await PostModel.find({user : userCurrent._id}).populate("user")
                console.log('postUserCurrent', postUserCurrent)
                const getAllPost = await PostModel.find({}).populate("user")
                console.log('get all post', getAllPost)
                const postUserCurrentFollowing = getAllPost?.filter((post) => 
                    {
                        return userCurrent.following.includes(post?.user?._id)
                    }
                )
                
                let dataTimeLinePost = postUserCurrent.concat(...postUserCurrentFollowing)
                res.status(200).json({dataTimeLinePost})

            

        } catch (error) {
            res.status(401).json({status: 'Lỗi'})
        }
    },
    likePost: async (req, res) => {
        try {

            const idUserCurrent = req.datatoken.id
            const postIsLike = await PostModel.findById(req.params.id)

            if (!idUserCurrent) {
                res.status(401).json({
                    status: 'Thích bài viết lỗi',
                })
            }
            else {
                if (postIsLike.likes.includes(idUserCurrent)) {
                    postIsLike.likes = postIsLike.likes.filter((id) => id != idUserCurrent)
                    await postIsLike.save()
                    res.status(200).json({status: 'Bạn đã bỏ thích bài viết này'})
                }
                else {
                    postIsLike.likes.push(idUserCurrent)
                    await postIsLike.save()
                    res.status(200).json({status: 'Bạn đã thích bài viết này thành công'})
                }
            }

        } catch (error) {
            res.status(401).json({status: 'Lỗi'})
        }
    },
    getOnePost: async (req, res) => {
        try {
            const idPost = req.params.id
            const findPostID = await PostModel.findById(idPost).populate('user')

            if (!findPostID) {
                res.status(404).json({status: 'Không tìm thấy bài viết'})
            }
            else {
                res.status(200).json({findPostID})
            }

        } catch (error) {
            res.status(401).json(error)
        }
    }
}

export default PostController