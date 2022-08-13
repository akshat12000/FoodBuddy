const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false
    },
    avatar:{
        public_id:String,
        url:String
    },
    type:{
        type:String,
        required:true,
        default:"user",
        enum:["user","admin"]
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ]
})

// Hash the plain text password before saving
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

// Comparing the password with the hash password
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

// Generating a token for the user
userSchema.methods.generateToken = async function(){
    const token = jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET);
    return token;
}

module.exports = mongoose.model('User',userSchema);