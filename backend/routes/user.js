const { login, register, logout, getUserDetails, updateUserDetails, updatePassword, deleteUserProfile } = require("../controllers/user");
const {isAuthenticated} = require("../middlewares/auth");
const userRouter = require("express").Router();

userRouter.post("/login",login);
userRouter.post("/register",register);
userRouter.get("/logout",logout);
userRouter.get("/profile",isAuthenticated,getUserDetails);
userRouter.put("/profile/update",isAuthenticated,updateUserDetails);
userRouter.put("/profile/update/password",isAuthenticated,updatePassword);
userRouter.delete("/profile/delete",isAuthenticated,deleteUserProfile);

module.exports = userRouter;