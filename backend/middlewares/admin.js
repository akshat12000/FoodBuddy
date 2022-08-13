exports.isAdmin = async (req,res,next)=>{
    if(req.user.type !== "admin"){
        return res.status(401).json({
            message:"You are not authorized to perform this action"
        });
    }
    next();
}