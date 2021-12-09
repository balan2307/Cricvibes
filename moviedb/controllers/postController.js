const Post=require('../models/post');


module.exports.post=async(req,res)=>
{
   
console.log("Inside post Controller") 
  res.render('show');
}

module.exports.createPost=async(req,res)=>
{
 
console.log("Got a post")  
console.log("User",req.body)
const {title,image,text}=req.body;
const newPost=new Post({title,image,text})
const saved=await newPost.save();
if(saved)
{

console.log("Saved",saved);
res.redirect('/user/post');
}

}

module.exports.getPost=async(req,res)=>
{
 
const posts=await Post.find({});

console.log(posts);
res.render('show',{posts});

}


module.exports.editPost=async(req,res)=>
{
 
const {title,image,text}=req.body;
const {id}=req.params;

const foundUser=await Post.findByIdAndUpdate(id,{title,image,text});
if(foundUser)
{
  // console.log("Updated",foundUser);
  res.redirect('/user/post');
}
}

module.exports.deletePost=async(req,res)=>
{
 

const {id}=req.params;

const foundUser=await Post.findByIdAndDelete(id);
if(foundUser)
{
  // console.log("Updated",foundUser);
  res.redirect('/user/post');
}
}