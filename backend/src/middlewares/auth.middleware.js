const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
async function authMiddleware(req,resp,next){
    const token = req.cookies.token
    if(!token){
        return resp.status(401).json({
            message : "Invalid User"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({
            _id : decoded._id
        })
        req.user = user
        next()
    }
    catch(error){
        return resp.status(401).json({
            message : "Invalid Token,Login First"
        })
    }
}

module.exports = authMiddleware