const Item = require("../models/Item");
const Restaurant = require("../models/Restaurant");
const cloudinary = require("cloudinary");
const Order = require("../models/Order");
const User = require("../models/User");

// Get All Restaurants
exports.getRestaurants = async (req, res) => {
    try{
        // Finding all restaurants from database
        const restaurants = await Restaurant.find({});

        // Sending the response
        res.status(200).json({
            success:true,
            restaurants 
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Create A Restaurant
exports.createRestaurant = async (req, res) => {
    try{

        // Getting values from the request
        const {name,address,coverPhoto,menu} = req.body;

        // Uploading the cover photo to cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(coverPhoto,{
            folder:"restaurants"
        });

        // Creating a new restaurant
        let restaurant = await Restaurant.create({name,address,coverPhoto:{public_id:myCloud.public_id,url:myCloud.secure_url},createdBy:req.user._id});
        const restMenu = [];

        // Creating a new menu for the restaurant
        for(let i=0;i<menu.length;i++){
            const myCloud2 = await cloudinary.v2.uploader.upload(menu[i].image,{
                folder:"menu",
            });
            const item = await Item.create({name:menu[i].name,price:menu[i].price,restaurant:restaurant._id,image:{public_id:myCloud2.public_id,url:myCloud2.secure_url},category:menu[i].category});
            restMenu.push(item._id);
        }

        // Updating the menu in the database
        restaurant = await Restaurant.findByIdAndUpdate(restaurant._id,{menu:restMenu}); 
        
        // Sending the response
        res.status(201).json({
            success:true,
            restaurant
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Getting a restaurant's details
exports.restaurantDetails = async (req, res) => {
    try{
        // Finding the restaurant from database
        const restaurant = await Restaurant.findById(req.params.id).populate("menu");

        // If the restaurant is not found
        if(!restaurant){
            return res.status(404).json({
                success:false,
                message:"Restaurant not found"
            });
        }

        // Sending the response
        res.status(200).json({
            success:true,
            restaurant
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Updating A Restaurant
exports.updateRestaurant = async (req, res) => {
    try{
        // Finding the restaurant from database
        const restaurant = await Restaurant.findById(req.params.id);

        // If the restaurant is not found
        if(!restaurant){
            return res.status(404).json({
                success:false,
                message:"Restaurant not found"
            });
        }

        // Getting values from the request
        const {name,address,coverPhoto} = req.body;

        // If the cover photo is changed
        if(coverPhoto){

            await cloudinary.v2.uploader.destroy(restaurant.coverPhoto.public_id);

            // Uploading the cover photo to cloudinary
            const myCloud = await cloudinary.v2.uploader.upload(coverPhoto,{
                folder:"restaurants"
            });

            restaurant.coverPhoto = {public_id:myCloud.public_id,url:myCloud.secure_url};
        }

        // Updating the restaurant
        restaurant.name = name;
        restaurant.address = address;

        // Updating the restaurant in the database
        await restaurant.save();

        // Sending the response
        res.status(200).json({
            success:true,
            restaurant
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Deleting A Restaurant
exports.deleteRestaurant = async (req, res) => {
    try{
        // Finding the restaurant from database
        const restaurant = await Restaurant.findById(req.params.id);
        
        // Finding all the users from database
        const users = await User.find({});

        // Finding all the orders from database
        const orders = await Order.find({});

        // If the restaurant is not found
        if(!restaurant){
            return res.status(404).json({
                success:false,
                message:"Restaurant not found"
            });
        }

        // Deleting the cover photo from cloudinary
        await cloudinary.v2.uploader.destroy(restaurant.coverPhoto.public_id);

        // Deleting Items from the database that are related to the restaurant
        for(let i=0;i<restaurant.menu.length;i++){
            const item = await Item.findById(restaurant.menu[i]);
            await cloudinary.v2.uploader.destroy(item.image.public_id);
            await item.remove();
        }

        // Deleting the orders from the database that are related to the restaurant
        for(let i=0;i<orders.length;i++){
            if(orders[i].restaurant == restaurant._id){

                // Deleting the order from user's orders
                for(let j=0;j<users.length;j++){
                    if(users[j]._id == orders[i].user){
                        users[j].orders.splice(users[j].orders.indexOf(orders[i]._id),1);
                        await users[j].save();
                    }
                }

                // Deleting the order from the database
                await Order.findByIdAndDelete(orders[i]._id);
            }
        }

        // Deleting the restaurant from database
        await restaurant.remove();

        // Sending the response
        res.status(200).json({
            success:true,
            message:"Restaurant deleted"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Creating a new menu item for a restaurant
exports.createMenuItem = async (req, res) => {
    try{
        // Finding the restaurant from database
        const restaurant = await Restaurant.findById(req.params.id);

        // If the restaurant is not found
        if(!restaurant){
            return res.status(404).json({
                success:false,
                message:"Restaurant not found"
            });
        }

        // Getting values from the request
        const {name,price,image,category} = req.body;

        // Uploading the image to cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder:"menu"
        });

        // Creating a new menu item
        const item = await Item.create({name,price,restaurant:restaurant._id,image:{public_id:myCloud.public_id,url:myCloud.secure_url},category});

        // Adding the item to the restaurant's menu
        restaurant.menu.push(item._id);

        // Updating the restaurant in the database
        await restaurant.save();

        // Sending the response
        res.status(201).json({
            success:true,
            item
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Getting a menu item for a restaurant
exports.getMenuItem = async (req, res) => {
    try{

        // Finding the menu item from database
        const item = await Item.findById(req.params.id);

        // If the menu item is not found
        if(!item){
            return res.status(404).json({
                success:false,
                message:"Menu item not found"
            });
        }

        // Sending the response
        res.status(200).json({
            success:true,
            item
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Updating a menu item for a restaurant
exports.updateMenuItem = async (req, res) => {
    try{
        // Finding the menu item from database
        const item = await Item.findById(req.params.id);

        // If the menu item is not found
        if(!item){
            return res.status(404).json({
                success:false,
                message:"Menu item not found"
            });
        }

        // Getting values from the request
        const {name,price,image,category} = req.body;

        // If the image is changed
        if(image){

            // Deleting the image from cloudinary
            await cloudinary.v2.uploader.destroy(item.image.public_id);

            // Uploading the image to cloudinary
            const myCloud = await cloudinary.v2.uploader.upload(image,{
                folder:"menu"
            });

            // Updating the image in the database
            item.image = {public_id:myCloud.public_id,url:myCloud.secure_url};
        }

        // Updating the menu item
        item.name = name;
        item.price = price;
        item.category = category;

        // Updating the menu item in the database
        await item.save();

        // Sending the response
        res.status(200).json({
            success:true,
            item
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Deleting a menu item for a restaurant
exports.deleteMenuItem = async (req, res) => {
    try{
        // Finding the menu item from database
        const item = await Item.findById(req.params.id);
        
        // If the menu item is not found
        if(!item){
            return res.status(404).json({
                success:false,
                message:"Menu item not found"
            });
        }

        // Finding the restaurant serving the menu item
        const restaurant = await Restaurant.findById(item.restaurant);

        if(!restaurant){
            return res.status(404).json({
                success:false,
                message:"Restaurant not found"
            });
        }
        
        // Deleting the image from cloudinary
        await cloudinary.v2.uploader.destroy(item.image.public_id);

        // Deleting the menu item from database
        await item.remove();

        // Deleting item from restaurant's menu
        restaurant.menu.splice(restaurant.menu.indexOf(item._id),1);

        // Updating the restaurant in the database
        await restaurant.save();

        // Sending the response
        res.status(200).json({
            success:true,
            message:"Menu item deleted"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
