require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateCaption(base64Data, mimeType) {
    const contents = [
        {
            inlineData: {
                mimeType: mimeType || "image/jpeg",
                data: base64Data
            }
        },
        {
            text: "Write a catchy social media caption for this image under 350 characters with hashtags."
        }
    ];

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
      config: {
            systemInstruction: "You are a precise social media automation backend. Your task is to look at the image and output ONLY one single, clean caption string with a few relevant hashtags. Do NOT provide multiple options, do NOT provide labels, do NOT provide introductory text, and absolutely ensure the entire output is under 250 characters so it fits database limits."
        }
    });

    return response.text;
}

module.exports = generateCaption;