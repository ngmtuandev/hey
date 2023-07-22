import PostController from "../controller/PostController.js";
import express from 'express'
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router()

router.post('/tao-bai-dang', verifyToken, PostController.createPost)
router.get('/nguoi-dang-bai/:id', PostController.getUserPost)
router.put('/chinh-sua-bai-dang/:id', verifyToken,  PostController.updatePost)
router.delete('/xoa-bai-viet/:id', verifyToken,  PostController.deletePost)
router.get('/', verifyToken,  PostController.getTimeLinePost)
router.put('/thich-bai-viet/:id', verifyToken,  PostController.likePost)
router.get('/bai-viet/:id', PostController.getOnePost)

export default router