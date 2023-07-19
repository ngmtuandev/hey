import express from 'express';
import UserController from '../controller/UserController.js';
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router()

router.get('/nguoi-dung-de-xuat', verifyToken, UserController.getUserPropose)


router.get('/danh-sach-ban-be', verifyToken, UserController.getUserFollowing)

router.get('/tat-ca-nguoi-dung', UserController.getAllUsers)

router.get('/:id', verifyToken, UserController.getOneUser)

router.put('/cap-nhap-thong-tin/:id', verifyToken, UserController.updateUser)

router.delete('/xoa-nguoi-dung/:id', verifyToken, UserController.deleteUser)

router.put('/theo-doi/:id', verifyToken, UserController.followUser)


export default router