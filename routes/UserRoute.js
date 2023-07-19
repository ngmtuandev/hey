import express from 'express';
import register from '../controller/Auth.js';

const router = express.Router()

router.post('/dangky', register)

export default router