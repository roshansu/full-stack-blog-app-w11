import e from 'express'
import { register, login, logout, getPost } from '../controller/userAuth.js'
import verifyUser from '../middleware/verifyUser.js'

const userRouter = e.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/', verifyUser, getPost)

export default userRouter