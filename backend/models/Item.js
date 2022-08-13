const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        public_id:String,
        url:String
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"
    },
    category:{
        type:String,
        required:true,
        enum:["North Indian","South Indian","Italian","Chaats","Chinese","Fast Food","Desserts","Beverages"]
    }
});

module.exports = mongoose.model("Item",itemSchema);