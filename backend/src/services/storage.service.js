require('dotenv').config();
const ImageKit = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadToImageKit(fileBuffer, uniqueFileName) {
   const base64File = fileBuffer.toString('base64');
    const response = await imagekit.files.upload({
        file: base64File, // Accepts the raw binary buffer directly
        fileName:uniqueFileName, // Ensures a unique filename
        folder: "/the-social-lens" // Optional: organizes uploads inside your ImageKit dashboard
    });
    return response;
}


module.exports = uploadToImageKit