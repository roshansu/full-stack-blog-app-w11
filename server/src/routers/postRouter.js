import e from 'express'
import { newPost, deletePost, getAllPost, recentPost } from '../controller/postControl.js'
import verifyUser from '../middleware/verifyUser.js'
import multer from 'multer'

const upload =  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB max
});

const postRouter = e.Router()

postRouter.get('/', getAllPost)
postRouter.post('/', upload.single('image'),verifyUser, newPost)
postRouter.delete('/:id', verifyUser, deletePost)
postRouter.get('/recent', recentPost)


export default postRouter