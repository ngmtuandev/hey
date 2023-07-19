import express from 'express';
import {register} from '../controller/Auth.js';
import {login} from '../controller/Auth.js';

const router = express.Router()

router.post('/dangky', register)
router.post('/dangnhap', login)

export default router