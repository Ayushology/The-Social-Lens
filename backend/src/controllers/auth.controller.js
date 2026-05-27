const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
async function registerController(req,resp) {
     const{username,password} = req.body;

    const isUserAlreadyExists = await User.findOne({
        username
    })

    if(isUserAlreadyExists){
        return resp.status(409).json({
            message : "User Already exists"
        })
    }

    const user = await User.create({
        username,
        password : await bcrypt.hash(password,10)
    });
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '7d' });
    resp.cookie('token',token);
    resp.status(201).json({
        message : "User created successfully",
       user: {
                username: user.username,
                id: user._id
            }
    })
}
async function loginController(req,resp) {
    const {username,password} = req.body;
    const user = await User.findOne({
        username
    })
   if(!user){
    return resp.status(401).json({
        message : "Invalid credentials"
    })
   }
   const validPassword = await bcrypt.compare(password,user.password)

   if(!validPassword){
    return resp.status(401).json({
        message : "Invalid credentials"
    })
   }
   const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '7d' });
   resp.cookie("token",token);

   return resp.status(200).json({
    message : "Logged in succesfully",
    user : {
       username :  user.username,
       id : user._id
    }
    })
}
module.exports = {
    registerController,loginController
}