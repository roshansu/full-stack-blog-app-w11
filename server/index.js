import e from 'express'
import connectDb from './src/db/connectDb.js'
import postRouter from './src/routers/postRouter.js'
import userRouter from './src/routers/userRoute.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = e()
const PORT = 5000


app.use(e.json({ limit: '10mb', type: 'application/json' }));
app.use(e.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser())
app.use(cors())


app.use('/posts', postRouter)
app.use('/user', userRouter)

connectDb()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("server is listening on ", PORT)
    })
})
.catch(console.error())