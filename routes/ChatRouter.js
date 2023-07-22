import express from 'express'
import ChatController from '../controller/ChatController.js'

const router = express.Router()

router.post('/', ChatController.createChat)
router.get('/:id', ChatController.userChat)
router.get('/doan-chat/:firstId/:secondId', ChatController.getChat)

export default router