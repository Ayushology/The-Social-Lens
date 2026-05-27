const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,"Username is required"],
        lowercase: true,
        trim: true,
        index:true
    },
    password:{
        type : String,
        required :[true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    } 
},
{
    timestamps : true
}
)

const User = mongoose.model('User',userSchema);

module.exports = User;