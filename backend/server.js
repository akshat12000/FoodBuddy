const dotenv = require("dotenv");
const express = require("express");
const { connectMongoose } = require("./database/database");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const app = express();

// Configuring the environment variables
dotenv.config({path:__dirname+"/config/config.env"});

// Essential middlewares
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookieParser());

// Connecting to MongoDB
connectMongoose();

// Setting up cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// Importing the routes
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const restaurantRoutes = require("./routes/restaurant");
app.use("/api/v1",userRoutes);
app.use("/api/v1",orderRoutes);
app.use("/api/v1",restaurantRoutes);

app.listen(process.env.PORT||4000,()=>{
    console.log("server is running");
})