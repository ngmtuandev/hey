import express from 'express'
import MessageController from '../controller/MessageController.js'

const router = express.Router()

router.post('/', MessageController.addNewMessage)
router.get('/:id', MessageController.getMessage)

export default router