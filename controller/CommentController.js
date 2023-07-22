import CommentModel from '../model/Comment.js'

const commentController = {
    createComment: async (req, res) => {
        try {
            const newComment = await (await CommentModel.create({...req.body, user: req.datatoken.id})).populate('user')

            res.status(201).json({newComment})

        } catch (error) {
            res.status(401).json({status: 'Lôĩ'})
        }
    },
    updateComment: async (req, res) => {
        try {
            
            const findComment = await CommentModel.findById(req.params.id)
            console.log(findComment)
                // console.log('findComment.user.toString()', findComment.user.toString() === req.datatoken.id.toString())
                if (findComment.user.toString() === req.datatoken.id.toString()) {
                    const commentUpdated = await CommentModel.findByIdAndUpdate(req.params.id, {$set: req.body},
                    {new: true})
                    res.status(200).json({
                        status: 'Cập nhập thành công',
                        data: commentUpdated
                    })
                }
                else {
                    res.status(401).json({status: 'Lỗi'})
                }
            

        } catch (error) {
            res.status(401).json({status: 'Lỗi'})
        }
    },
    deleteComment: async (req, res) => {
        try {
            const findComment = await CommentModel.findById(req.params.id)
            if (findComment.user.toString() === req.datatoken.id.toString()) {
                await CommentModel.findByIdAndDelete(req.params.id)
                res.status(200).json({status: 'Xóa bình luận thành công'})
            }
            else {
                res.status(404).json({status: 'Xóa bình luận thất bại'})
            }
        } catch (error) {
            res.status(401).json({status: 'Lỗi'})
        }
    },
    getOneComment: async (req, res) => {
        try {
            const getComment = await CommentModel.findById(req.params.id)
            if (!getComment) {
                res.status(401).json({status: 'Bình luận này không tồn tại'})
            }
            else {
                res.status(200).json({data: getComment})
            }
        } catch (error) {
            res.status(401).json({status: 'Lỗi'})
        }
    },
    getAllCommentInOnePost: async (req, res) => {
        try {
            const allCommentInOnePost = await CommentModel.find({post: req.params.id}).populate('user')
            res.status(200).json({data: allCommentInOnePost})
        } catch (error) {
            res.status(401).json({status: 'Lỗi'})
        }
    },
    likeComment: async (req, res) => {
        try {
            const idUserCurrent = req.datatoken.id
            const getCommentIsLike = await CommentModel.findById(req.params.id)
            // console.log('idUserCurrent', idUserCurrent)
            // console.log('getCommentIsLike', getCommentIsLike)

            if (getCommentIsLike.likes.includes(idUserCurrent)) {
                getCommentIsLike.likes = getCommentIsLike.likes.filter((user) => user !== idUserCurrent)
                await getCommentIsLike.save()
                res.status(201).json({status: 'Bạn đã bỏ thích bài viết này'})
            }

            else {
                getCommentIsLike.likes.push(idUserCurrent)
                await getCommentIsLike.save()
                res.status(201).json({status: 'Bạn đã thích bài viết này thành công'})
            }

        } catch (error) {
            res.status(401).json({status: 'Lỗi'})
        }
    }
}

export default commentController