const Post = require('../models/post.model')

async function createPostController(req,resp) {
    const file = req.file
    console.log("file received",file);
    
}

module.exports = createPostController