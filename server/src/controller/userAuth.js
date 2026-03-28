import User from "../models/user.js"
import Post from "../models/post.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validate from "../utils/validate.js"
import dotenv from 'dotenv'
dotenv.config()

export const register = async (req, res) => {
    try{
        const {email, password, name} = req.body
        console.log("hiting api register")
        validate(req.body)
        req.body.password = await bcrypt.hash(password, 10)
        const user = await User.create(req.body)
        const token = jwt.sign({_id: user._id, email}, process.env.JWT_KEY, {expiresIn: '30d'} )
        res.send({message:"register success", success: true, token, email, name, _id: user._id})

    }catch(err){
        console.log("error msg",err)
        res.send({message:"Something went wrong", success:false, err})
    }
}

export const login = async (req, res) =>{
    try{
        const {email, password} = req.body
        console.log("login function")
        const user = await User.findOne({email})

        if(!user){
            res.send({message:"Invalid email or password", success: false})
            return
        }

        // console.log(user)

        const isTrue = await bcrypt.compare(password, user.password)
        if(!isTrue){
            res.send({message:"Invalid email or password", success: false})

            return
        }

        const token = jwt.sign({_id: user._id, email}, process.env.JWT_KEY, {expiresIn: "30d"})
        // res.cookie("token", token)
        res.send({message:"Login success", success: true, token, email, name: user.name, _id: user._id})
    }catch(err){
        console.log(err)
        res.send({message:"something went wrong", success: false, err})

    }

}

export const getPost = async (req, res) =>{
    try {
        const userId = req.result._id
        const data = await Post.find({author: userId}).populate("author", "name");
        res.send(data);
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
}

export const logout = async (req, res) => {

}