const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[
        {
            item:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Item",
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"
    },
    rating:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        default:"Placed",
        enum:["Placed","On The Way","Delivered","Cancelled"]
    }
});

module.exports = mongoose.model('Order',orderSchema);