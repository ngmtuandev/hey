import CommentController from "../controller/CommentController.js";
import express from 'express'
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/', verifyToken, CommentController.createComment)
router.put('/sua-binh-luan/:id', verifyToken, CommentController.updateComment)
router.get('/:id', CommentController.getOneComment)
router.get('/tat-ca-binh-luan/:id', CommentController.getAllCommentInOnePost)
router.put('/thich-binh-luan/:id', verifyToken, CommentController.likeComment)
router.delete('/xoa-binh-luan/:id', verifyToken, CommentController.deleteComment)

export default router