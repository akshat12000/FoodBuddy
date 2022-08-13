const {getRestaurants, createRestaurant, restaurantDetails, updateRestaurant, deleteRestaurant, createMenuItem, updateMenuItem, deleteMenuItem, getMenuItem} = require("../controllers/restaurant");
const {isAdmin} = require("../middlewares/admin");
const { isAuthenticated } = require("../middlewares/auth");

const restaurantRouter = require('express').Router();

restaurantRouter.get("/restaurants",isAuthenticated,getRestaurants);
restaurantRouter.post("/restaurant/create",isAuthenticated,isAdmin,createRestaurant);
restaurantRouter.route("/restaurant/:id").get(isAuthenticated,restaurantDetails).put(isAuthenticated,isAdmin,updateRestaurant).delete(isAuthenticated,isAdmin,deleteRestaurant);
restaurantRouter.post("/restaurant/menu/create/:id",isAuthenticated,isAdmin,createMenuItem);
restaurantRouter.put("/restaurant/menu/update/:id",isAuthenticated,isAdmin,updateMenuItem);
restaurantRouter.delete("/restaurant/menu/delete/:id",isAuthenticated,isAdmin,deleteMenuItem);
restaurantRouter.get("/restaurant/menu/:id",isAuthenticated,getMenuItem);

module.exports = restaurantRouter;