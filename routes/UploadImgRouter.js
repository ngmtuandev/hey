import express from 'express';
import multer from 'multer'

const router = express.Router()
const storageDestination = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/images")
    },
    filename: (req, res, cb) => {
        cb(null, req.body.filename)
    }
})

const uplaodFile = multer({storage: storageDestination})

router.post('/', uplaodFile.single('file', async (req, res) => {
    try {
        res.status(201).json({
            status: 'Upload Images successfully'
        })
    } catch (error) {
        console.log(error)
    }
}))

export default router