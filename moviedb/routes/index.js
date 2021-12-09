const express=require('express');
const router = require('./user');
const adminRouter=require('./user');
const postRouter=require('./post')
const userController=require('../controllers/userController')



const InitRoutes = (app) => {

    
    app.use("/user", adminRouter);
    app.use("/", postRouter);
    console.log("Routes Initialized")
  

  }


  module.exports=InitRoutes;