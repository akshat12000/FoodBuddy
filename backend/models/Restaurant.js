const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    coverPhoto: {
        public_id:String,
        url:String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    menu:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Item"
        }
    ],
    ratings:[
        {
           user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"  
           },
           rating:{
            type:Number,
            default:0
           }
        }
    ],
    noRated:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);