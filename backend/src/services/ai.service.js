require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({}); 

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works in a few words",
    });
    console.log("Gemini Output:", response.text);
  } 
  catch (error) {
    console.error("Gemini API Error:", error.message);
  }
}

main();