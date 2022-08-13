const Item = require("../models/Item");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

// Getting All the Orders
exports.getAllOrders = async (req, res) => {
    try{
        let orders;
        // Finding all the orders from the database
        if(req.user.type==="admin"){
            orders = await Order.find({}).populate("items.item");
        }else{
            orders = await Order.find({user:req.user._id}).populate("items.item restaurant");
        }

        // Sending the response
        res.status(200).json({
            success:true,
            orders
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Creating a new Order
exports.createOrder = async (req, res) => {
    try{
        // Getting items from the request body
        const {items} = req.body;

        // Getting the restaurant for the items
        let item = {};
        for(let i=0;i<items.length;i++){
            item = await Item.findById(items[i].item);
            if(!item){
                return res.status(404).json({
                    success:false,
                    message:"Item not found"
                });
            }
        }

        const restaurant = item.restaurant;

        // Creating a new order
        const order = await Order.create({user:req.user._id,items,restaurant:restaurant});

        // Sending the response
        res.status(201).json({
            success:true,
            order
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Getting the Order
exports.getOrder = async (req, res) => {
    try{
        // Finding the order from the database
        const order = await Order.findById(req.params.id);

        // Checking if the order exists
        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not found"
            });
        }

        // Checking if the user is the owner of the order
        if(order.user.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"You are not authorized to see this order"
            });
        }

        // Sending the response
        res.status(200).json({
            success:true,
            order
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Updating the Order
exports.updateOrder = async (req, res) => {
    try{

        // Getting items from the request body
         const {items} = req.body;

        // Finding the order from the database
        const orderToUpdate = await Order.findById(req.params.id);

        // Checking if the order exists
        if(!orderToUpdate){
            return res.status(404).json({
                success:false,
                message:"Order not found"
            });
        }

        // Checking if the user is the owner of the order
        if(orderToUpdate.user.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"You are not authorized to update this order"
            });
        }

        // Getting the restaurant for the items
        let item = {};
        for(let i=0;i<items.length;i++){
            item = await Item.findById(items[i].item);
            if(!item){
                return res.status(404).json({
                    success:false,
                    message:"Item not found"
                });
            }
        }

        // Updating the order
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{items:items,status:"Placed"},{new:true});

        // Sending the response
        res.status(200).json({
            success:true,
            updatedOrder
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Deleting the Order
exports.deleteOrder = async (req, res) => {
    try{

        // Finding the order from the database
        const orderToDelete = await Order.findById(req.params.id);

        // Checking if the order exists
        if(!orderToDelete){
            return res.status(404).json({
                success:false,
                message:"Order not found"
            });
        }

        // Checking if the user is the owner of the order
        if(orderToDelete.user.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"You are not authorized to delete this order"
            });
        }

        // Deleting the order
        await Order.findByIdAndDelete(req.params.id);

        // Sending the response
        res.status(200).json({
            success:true,
            message:"Order deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// Changing the Order Status
exports.changeOrderStatus = async (req, res) => {
    try{
            
        // Getting the status from the request body
        const {status} = req.body;

        // Finding the order from the database
        const orderToUpdate = await Order.findById(req.params.id);

        // Checking if the order exists
        if(!orderToUpdate){
            return res.status(404).json({
                success:false,
                message:"Order not found"
            });
        }

        // Checking if the user is admin
        if(req.user.type!=='admin'){
            return res.status(401).json({
                success:false,
                message:"You are not authorized to update this order"
            });
        }

        // Updating the order
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{status:status},{new:true});

        // Sending the response
        res.status(200).json({
            success:true,
            updatedOrder
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.rateOrder = async (req,res)=>{
    try{
        // Getting the ratings from the body
        const {rating} = req.body;
        // Getting the id of the current order
        const id = req.params.id;
        // Updating the order rating
        const order = await Order.findById(id)
        order.rating=rating;
        await order.save()
        // Updating the restaurant ratings
        const restaurant = await Restaurant.findById(order.restaurant)
        var findUser=-1;
        for(let i=0;i<restaurant.ratings.length;i++){
            if(restaurant.ratings[i].user.toString()===req.user._id.toString()){
                findUser=i;
                break;
            }
        }
        if(findUser>=0){
            restaurant.ratings[findUser].rating=rating;
        }else{
            restaurant.ratings.push({user:req.user._id,rating})
            restaurant.noRated+=1;
        }
        await restaurant.save()
        res.status(200).send({
            success:true,
            message:"Order Rated Successfully!"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}