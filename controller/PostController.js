import PostModel from "../model/Post.js";
import UserModel from "../model/User.js";

const PostController = {
    createPost: async (req, res) => {
        try {
            const userPost = await UserModel.findById(req.datatoken.id)
            const newPost = await PostModel.create({...req.body, userpost: userPost._id})
            console.log(newPost)
            if (!newPost) {
                res.status(401).json({status: 'Khong thể tạo bài đăng'})
            }
            else {
                res.status(200).json({
                    status: 'Tạo bài đăng thành công',
                    data: {newPost, userPost}                
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
            const userPosts = await PostModel.find({userpost: req.params.id})
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
            if (!post) {
                res.status(404).json({status: 'Không tồn tại bài viết này'})
            }
            else {
                if (post?.userpost.toString() === req.datatoken.id) {
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
            
            if (userCurrent) {
                const postUserCurrent = await PostModel.find({userpost : userCurrent._id})

                const getAllPost = await PostModel.find({})
                console.log(getAllPost)
                const postUserCurrentFollowing = getAllPost?.filter((post) => userCurrent.following.includes(post?.userpost))
                
                let dataTimeLinePost = postUserCurrent.concat(...postUserCurrentFollowing)

                res.status(200).json({dataTimeLinePost})

            }
            

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
    }
}

export default PostController