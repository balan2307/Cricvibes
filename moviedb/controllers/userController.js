const bcrypt = require("bcrypt");
const User=require('../models/user');


module.exports.loginUser=async(req,res)=>
{
    
    const {email,password}=req.body;
 
    const foundUser=await User.findOne({email});
    const result=await bcrypt.compare(password, foundUser.password);
    
    if(result)
    {
        req.session.user=foundUser;
        res.redirect('/user/post')
    }
    else
    {
        res.send("Wrong password");
    }

}

module.exports.registerUser=async(req,res)=>
{
    const {username,email,password}=req.body;
    console.log("Test",req.body)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("User",req.body,hashedPassword);
    const newUser=new User({username,email,password:hashedPassword})
    const saved=await newUser.save();
    if(saved)
    {
    req.session.user=saved;
    console.log("Saved",saved)
    res.render('show');
    }

}