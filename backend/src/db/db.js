const mongoose = require('mongoose')

async function connecttodb() {
    try{
        await(mongoose.connect(process.env.MONGODB_URI));
        console.log("☘️ MongoDB Connected successfully!");
    }
    catch(error){
        console.error("❌ MongoDB connection failed: ", error.message);
    }
}

module.exports = connecttodb