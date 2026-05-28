const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadToImageKit = require('../services/storage.service')
const {v4 : uuidv4} = require('uuid')
async function createPostController(req, resp) {
    try {
        const file = req.file;
        if(!file){
            return resp.status(400).json(
            { success: false, message: "No image file received" });
        }

        console.log("File received:", file.originalname);

       
        const base64Image = file.buffer.toString('base64');

        
        const caption = await generateCaption(base64Image, file.mimetype);
        console.log("Generated caption:", caption);

        const uniqueName = `${uuidv4()}-${file.originalname}`;


        console.log("Uploading file buffer to ImageKit cloud bucket...");
        const result = await uploadToImageKit(file.buffer, uniqueName);
        console.log("ImageKit upload successful! Destination URL:", result.url);
        
        const newPost = await postModel.create({
            image: result.url,
            caption: caption,
          user: req.user ? req.user._id : null
        });

        return resp.status(201).json({
            success: true,
            message: "Post created successfully with AI caption!",
            caption: caption,
            post: newPost
        });

    } catch (error) {
        console.error("Controller Error:", error.message);
        return resp.status(500).json({ 
            success: false, 
            message: "Server failed to process post", 
            error: error.message 
        });
    }
}

module.exports = {
    createPostController
};