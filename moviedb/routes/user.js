const express = require("express");
const router = express.Router();

const userController=require('../controllers/userController')

router.route('/login')
.get((req,res)=>{
  res.render("auth/login")})
.post(userController.loginUser);

router.route('/register')
.get((req,res)=>res.render("auth/register"))
.post(userController.registerUser);

router.route('/check')
.get((req,res)=>res.send(req.session));

router.route('/home')
.get((req,res)=>res.render('show'))

module.exports=router;