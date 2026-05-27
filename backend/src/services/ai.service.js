require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");
const Post = require("../models/post.model");

const ai = new GoogleGenAI({}); 

async function generateCaptionController(req, resp) {
  try {
   
    if (!req.file) {
      return resp.status(400).json({ success: false, message: "No image file uploaded via Postman" });
    }

   
    const base64Data = req.file.buffer.toString("base64");

  
    const contents = [
      {
        inlineData: {
          mimeType: req.file.mimetype, 
          data: base64Data,
        },
      },
      { 
        text: "Write a catchy social media caption for this image under 350 characters with hashtags." 
      },
    ];

   
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    const generatedCaption = response.text;

  
    const newPost = await Post.create({
        image: "uploaded_via_postman", 
        caption: generatedCaption,
        user: req.user?.id || null 
    });


    return resp.status(201).json({
      success: true,
      message: "Caption generated successfully!",
      caption: generatedCaption,
      post: newPost
    });

  }
   catch (error) {
    console.error("Postman Generation Error:", error.message);
    return resp.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { generateCaptionController };