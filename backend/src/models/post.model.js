const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    image:{
        type :String,
        required : [true,"An image upload path or URL is required"]
    },
   caption: {
        type: String,
        trim: true,
        maxlength: [350, "Caption cannot exceed 350 characters"]
    },
    user : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "user"
    }
},
{
    timestamps: true
}
)

const Post = mongoose.model("post",postSchema);

module.exports = Post