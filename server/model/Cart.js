const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    Email:{
        type : String,
        required : true,
    },
    Image:{
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
    Genre:{
        type : String,
        required : true,
    },
    Price:{
        type : Number,
        required : true,
    },
    Count:{
        type : Number,
        required : true,
    },
    Order:{
        type : Boolean,
        default:false,
    },
    OrderId:{
        type : Number,
        required : false,
    },

},{
    timestamps:true
});
const Cart = mongoose.model("CartData",CartSchema);
module.exports = Cart;
