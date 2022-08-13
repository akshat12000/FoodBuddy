const orderRouter = require("express").Router();
const { getAllOrders, createOrder, updateOrder, deleteOrder, getOrder, changeOrderStatus, rateOrder } = require("../controllers/order");
const { isAdmin } = require("../middlewares/admin");
const { isAuthenticated } = require("../middlewares/auth");

orderRouter.get("/orders",isAuthenticated,getAllOrders);
orderRouter.get("/order/:id",isAuthenticated,isAdmin,getOrder);
orderRouter.post("/order/create",isAuthenticated,createOrder);
orderRouter.put("/order/update/:id",isAuthenticated,updateOrder);
orderRouter.delete("/order/delete/:id",isAuthenticated,deleteOrder);
orderRouter.put("/order/update/status/:id",isAuthenticated,isAdmin,changeOrderStatus);
orderRouter.post("/order/rate/:id",isAuthenticated,rateOrder);

module.exports = orderRouter;