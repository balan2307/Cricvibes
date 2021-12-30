const bcrypt = require("bcrypt");
const User=require('../models/user');
const catchAsync=require('../utils/catchAsync');
const Post=require('../models/post');
const { findById } = require("../models/user");
const {cloudinary}=require('../cloudinary');


module.exports.loginUser=catchAsync(async(req,res)=>
{
    
    const {email,password}=req.body;
   
 
    const foundUser=await User.findOne({email});
    console.log("Body",req.body,foundUser);
    const result=await bcrypt.compare(password, foundUser.password);
    
    if(result)
    {
        req.session.user=foundUser;
        res.redirect('/user/post');
        console.log("Loggg me")
    }
    else
    {
        res.send("Wrong password");
    }

})

module.exports.registerUser=catchAsync(async(req,res)=>
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
    res.redirect('/user/post');
    }

})


module.exports.getProfile=catchAsync(async(req,res)=>
{
  
const {id}=req.params; 
const currentUser=req.session.user._id;
let vposts=[];
// console.log("Profile requested",id)
const posts=await Post.find({user:currentUser}).populate('user');
const uposts=await Post.find({upvotes:{$in:[currentUser]}}).populate('user')
const dposts=await Post.find({downvotes:{$in:[currentUser]}}).populate('user')

vposts=[...uposts,...dposts]
vposts.concat(uposts)

const cuser=await User.findById(id);


res.render('profile',{posts,vposts,cuser});
})




module.exports.updateProfile=catchAsync(async(req,res)=>
{
  
    
   
    const {username,bio}=req.body;
    const {id}=req.params;
    const getUser=await User.findById(id);
    let image={}
    const {profile_image,cover_image}=req.files;
    console.log("files",profile_image,cover_image);
    let pimage={}
    let cimage={}
    if(!profile_image)
    {
        pimage=getUser.profile_image;
    }
    else
    {
     pimage={url:profile_image[0].path,filename:profile_image[0].filename}
    }

    if(!cover_image)
    {
        cimage=getUser.cover_image;
    }
    else
    {
     cimage={url:cover_image[0].path,filename:cover_image[0].filename}
    }



    console.log("Images",pimage,cimage);

    // if(!req.files)
    // { 
    
    //   image=getUser.image;
    // }
    // else
    // {
    //   const {path,filename}=req.file;
    //   image={url:path,filename:filename};
    // }
    
   

      


    const saved=await User.findByIdAndUpdate(id,{username,bio,profile_image:pimage,cover_image:cimage},{new: true});
 

    console.log("Saved profile",saved);
    res.redirect(`/user/profile/${id}`);

})



module.exports.deleteImage=catchAsync(async(req,res)=>
{
  
const {id}=req.params; 
console.log("Inside route",id);

const getUser=await User.findById(id);
console.log("Getuser",getUser);
await User.findByIdAndUpdate(id,{cover_image:{}})
const filename=getUser.cover_image.filename;
await cloudinary.uploader.destroy(filename);
res.send("Success");

})


module.exports.deleteprofileImage=catchAsync(async(req,res)=>
{
  
const {id}=req.params; 
console.log("Inside route",id);

const getUser=await User.findById(id);
console.log("Getuser",getUser);
await User.findByIdAndUpdate(id,{profile_image:{}})
const filename=getUser.profile_image.filename;
await cloudinary.uploader.destroy(filename);
res.send("Success");

})

