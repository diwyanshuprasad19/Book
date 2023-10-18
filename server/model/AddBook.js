const mongoose = require('mongoose');

const AddBookSchema = new mongoose.Schema({
    Image:{
        type : String,
        required : true,
    },
    Title:{
        type : String,
        required : true,
    },
    Description:{
        type : String,
        required : true,
    },
    Author:{
        type : String,
        required : true,
    },
    Genre:{
        type : String,
        required : true,
    },
    Language:{
        type : String,
        required : true,
    },
    Price:{
        type : Number,
        required : true,
    },
    Pagecount:{
        type : Number,
        required : true,
    },
    rate:{
        type : Number,
        default:0,
    },
    ratecount:{
        type : Number,
        default:0,
    },
},{
    timestamps:true
});
const AddBook = mongoose.model("AddBookData",AddBookSchema);
module.exports = AddBook;
