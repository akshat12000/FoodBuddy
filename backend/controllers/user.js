const User  = require('../models/User');
const cloudinary = require('cloudinary');
const Order = require('../models/Order');

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        // Getting the user from the database
        const user = await User.findOne({email}).select("+password").populate("orders");
        
        // If user is not found
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            });
        }

        const isMatch = await user.matchPassword(password);
        
        // If the password is wrong
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password",
            });
        }

        // Generating a token
        const token = await user.generateToken();
        
        // Setting the cookie options
        const options = {
            expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true
        }

        // Sending the response along with setting the cookie
        res.status(200).cookie("token",token,options)
        .json({
            success:true,
            user,
            token
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.register = async (req,res)=>{
    try{
        const {name,email,password,type,avatar}=req.body;
        // Finding the user in the database
        let user = await User.findOne({email});

        // If user is found
        if(user){
            return res.status(400).json({success:false,message:"User Already Exists"})
        }

        // Uploading the avatar to cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(avatar,{
            folder:"avatars"
        });

        // Creating the user
        user = await User.create({name,email,password,type,avatar:{public_id:myCloud.public_id,url:myCloud.secure_url}});
        
        // Generating a token
        const token = await user.generateToken();
        
        // Setting the cookie options
        const options = {
            expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true
        }

        // Sending the response along with setting the cookie
        res.status(201).cookie("token",token,options)
        .json({
            success:true,
            user,
            token
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.logout = async (req,res)=>{
    try{
        // Clearing the cookie
       res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true})
       .json({
        success:true,
        message:"Logged Out"
       }) 
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.getUserDetails = async (req,res)=>{
    try{
        // Finding the current logged in user
        const user = await User.findById(req.user._id).populate("orders");

        // Sending the response
        res.status(200).json({
            success:true,
            user
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.updateUserDetails = async (req,res)=>{
    try{

        // Finding the current logged in user
        const user = await User.findById(req.user._id);

        // Getting the new details from the request
        const {name,email,avatar} = req.body;

        // if name is changed
        if(name){
         user.name=name;
        } 

        // if email is changed
        if(email){
         user.email=email;
        }

        // if avatar is changed
        if(avatar){

            // Removing the old avatar from cloudinary
             await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            // Uploading the new avatar to cloudinary
             const myCloud = await cloudinary.v2.uploader.upload(avatar,{
                 folder:"avatars"
             })

            // Updating the avatar in the database
             user.avatar.public_id=myCloud.public_id;
             user.avatar.url=myCloud.secure_url;
        }

        // Saving the changes to the database
        await user.save();

        // Sending the response
        res.status(200).json({
         success: true,
         message: "Profile updated"
     })
    }catch(error){
         res.status(500).json({
             success:false,
             message:error.message
         });
    }
}

exports.deleteUserProfile = async (req,res)=>{
    try{
        // Finding the current logged in user
        const user = await User.findById(req.user._id);
        const userOrders = user.orders;

        // Removing the avatar from cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        // Deleting the user
        await user.remove();

        // Logging out the user
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        // Deleting the orders of the user
        for(let i=0;i<userOrders.length;i++){
            const order = await Order.findById(userOrders[i]);
            await order.remove();
        }

        // Sending the response
        res.status(200).json({
            success:true,
            message:"Profile deleted"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.updatePassword = async (req,res)=>{
    try{
        // Finding the current logged in user
        const user = await User.findById(req.user._id).select("+password");

        // Getting the old and new password from the request
        const {oldPassword,newPassword} = req.body;

        // If the old password or new password is empty
        if(!oldPassword||!newPassword){
            return res.status(400).json({
                success:false,
                message:"Please provide old and new password"
            })
        }

        // If the old password is wrong
        const isMatch = await user.matchPassword(oldPassword);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect old password"
            })
        }

        // Updating the password
        user.password = newPassword;

        // Saving the changes to the database
        await user.save();

        // Sending the response
        res.status(200).json({
            success: true,
            message: "Password updated"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}