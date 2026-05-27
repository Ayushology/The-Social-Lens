const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");

async function createPostController(req, res) {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: "No image file received" });
        }

        console.log("File received:", file.originalname);

       
        const base64Image = file.buffer.toString('base64');

        
        const caption = await generateCaption(base64Image, file.mimetype);
        console.log("Generated caption:", caption);

       
        const newPost = await postModel.create({
            image: "uploaded_via_postman_buffer",
            caption: caption,
            user: req.user?._id || null
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully with AI caption!",
            post: newPost
        });

    } catch (error) {
        console.error("Controller Error:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Server failed to process post", 
            error: error.message 
        });
    }
}

module.exports = {
    createPostController
};