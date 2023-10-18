const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Username:{
        type : String,
        required : true,
    },
    Email:{
        type : String,
        required : true,
    },
    Password:{
        type : String,
        required : true,
    },
    Auth:{
        type : Boolean,
        default:false,
    },
},{
    timestamps:true
});
const User = mongoose.model("UserData",UserSchema);
module.exports = User;
