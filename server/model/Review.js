const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    Email:{
        type : String,
        required : true,
    },
    Title:{
        type : String,
        required : true,
    },
    Author:{
        type : String,
        required : true,
    },
    Rating:{
        type : Number,
        required : true,
    },
    Review:{
        type : String,
        required : true,
    },


},{
    timestamps:true
});
const Review = mongoose.model("ReviewData",ReviewSchema);
module.exports = Review;
