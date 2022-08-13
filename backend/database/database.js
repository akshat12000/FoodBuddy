const mongoose = require('mongoose');

exports.connectMongoose = ()=>{
    mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((e)=>{
        console.log(`MongoDB connected:${e.connection.host}`);
    }).catch(err=>{
        console.log(err);
    });
}