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
    // console.log("Test",req.body);
    const checkifPresent=await User.find({username:username});
    if(checkifPresent.length>0)
    {
        // console.log("Username is taken");
        req.flash("error", "Username already taken");
        res.redirect('/user/register');
    }
    else
    {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log("User",req.body,hashedPassword);
    const newUser=new User({username,email,password:hashedPassword})
    const saved=await newUser.save();
    if(saved)
    {
    req.session.user=saved;
    // console.log("Saved",saved)
    res.redirect('/user/post');
    }
}

})

module.exports.logoutUser = catchAsync((req, res) => {
    req.flash("success", "You are logged out!");
    req.session.destroy();
    res.redirect("/user/login");
  })



module.exports.getProfile=catchAsync(async(req,res)=>
{
  
const {id}=req.params; 
const currentUser=req.session.user._id;
let vposts=[];
// console.log("Profile requested",id)
let posts=[];
let uposts=[];
let dposts=[];

// if(id==currentUser)
// {
// // console.log("If user");
// posts=await Post.find({user:currentUser}).populate('user');
// uposts=await Post.find({upvotes:{$in:[currentUser]}}).populate('user')
// dposts=await Post.find({downvotes:{$in:[currentUser]}}).populate('user')
// }
// else
// {

// console.log("else user");
posts=await Post.find({user:id}).populate('user');
uposts=await Post.find({upvotes:{$in:[id]}}).populate('user')
dposts=await Post.find({downvotes:{$in:[id]}}).populate('user')
// }



vposts=[...uposts,...dposts]
vposts.concat(uposts)

const cuser=await User.findById(id);
console.log("Cuser",cuser);

const shared=cuser.shared;
const sposts=[]
for(let i=0;i<shared.length;i++)
{
    sposts.push(shared[i].id.valueOf())

}
console.log("Sposts",sposts)

const uid=req.session.user._id;
const current_user=await User.findById(uid);
let user_following=[];
// console.log("User now",current_user);
user_following=current_user.following;

// console.log("Updated",user_following)
res.render('profile',{posts,vposts,currentUser,sposts,cuser,user_following});
})




module.exports.updateProfile=catchAsync(async(req,res)=>
{
  
    
   
    const {username,bio}=req.body;
    const {id}=req.params;
    const getUser=await User.findById(id);
    let image={}
    const {profile_image,cover_image}=req.files;
    // console.log("files",profile_image,cover_image);
    let pimage={}
    let cimage={}
    if(!profile_image)
    {
        pimage=getUser.profile_image;
    }
    else
    {
 
        if(getUser.profile_image && getUser.profile_image.filename) 
        {
     await cloudinary.uploader.destroy(getUser.profile_image.filename);
        }
      
     pimage={url:profile_image[0].path,filename:profile_image[0].filename}
    }

    if(!cover_image)
    {
        cimage=getUser.cover_image;
    }
    else
    {
        if(getUser.cover_image && getUser.cover_image.filename) 
        {
        await cloudinary.uploader.destroy(getUser.cover_image.filename);
        }
     cimage={url:cover_image[0].path,filename:cover_image[0].filename}
    }



    // console.log("Images",pimage,cimage);


    const saved=await User.findByIdAndUpdate(id,{username,bio,profile_image:pimage,cover_image:cimage},{new: true});
 

    // console.log("Saved profile",saved);
    res.redirect(`/user/profile/${id}`);

})



module.exports.deleteImage=catchAsync(async(req,res)=>
{
  
const {id}=req.params; 
// console.log("Inside route",id);

const getUser=await User.findById(id);
// console.log("Getuser",getUser);
await User.findByIdAndUpdate(id,{cover_image:{}})
const filename=getUser.cover_image.filename;
await cloudinary.uploader.destroy(filename);
res.send("Success");

})


module.exports.deleteprofileImage=catchAsync(async(req,res)=>
{
  
const {id}=req.params; 
// console.log("Inside route",id);

const getUser=await User.findById(id);
// console.log("Getuser",getUser);
await User.findByIdAndUpdate(id,{profile_image:{}})
const filename=getUser.profile_image.filename;
await cloudinary.uploader.destroy(filename);
res.send("Success");

})


//follow





module.exports.addFollower=catchAsync(async(req,res)=>
{

const {user_id}=req.params; 
  
// console.log("Follow",user_id);
const id=req.session.user._id;
const user=await User.findByIdAndUpdate(user_id,{$addToSet:{followers:id}});
const current_user=await User.findByIdAndUpdate(id,{$addToSet:{following:user_id}},{new:true});
// console.log("followed",current_user)
req.session.user=current_user;
// console.log("set session f",req.session.user)

})



module.exports.removeFollower=catchAsync(async(req,res)=>
{
  
const {user_id}=req.params; 
// console.log("UnFollow",user_id);
const id=req.session.user._id
const user=await User.findByIdAndUpdate(user_id,{$pull:{followers:id}});
const current_user=await User.findByIdAndUpdate(id,{$pull:{following:user_id}},{new:true});
// console.log("Unfollowed",current_user)
req.session.user=current_user;
// console.log("set session rf",req.session.user)

})


module.exports.sharePost=catchAsync(async(req,res)=>
{
  
const {id}=req.params;
const uid=id.valueOf()
// console.log("Shared",id);
const user_id=req.session.user._id;
const ctime=Date.now()

await Post.findByIdAndUpdate(id,{$addToSet:{sharedBy:user_id}})
await User.findByIdAndUpdate(user_id,{$addToSet:{shared:{id:uid,time:ctime}}})
res.send("Success");


})

module.exports.unsharePost=catchAsync(async(req,res)=>
{
  
const {id}=req.params;
const uid=id.valueOf();
// console.log("unShared",id)
let user_id=req.session.user._id;

await Post.findByIdAndUpdate(id,{$pull:{sharedBy:user_id}})
await User.findByIdAndUpdate(user_id,{$pull:{shared:{id:uid}}})
res.send("Success");


})

module.exports.searchUser=catchAsync(async(req,res)=>
{
  
const id=req.session.user._id;
const current_user=await User.findById(id);
let user_following=[];
// console.log("User now",current_user);
user_following=current_user.following;  

const {user_search}=req.body;
// console.log("Search user",user_search);
// const items=await User.find({username: new RegExp(user_search,'i')})
const users=await User.find({username : {$regex :user_search,$options:'$i'}})
// console.log("items",users)
res.render("partials/searchresult",{users,user_following,current_user})



})

