const Joi = require('joi');
const Post=require('../models/post');
const catchAsync=require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const expressError=require('../utils/ExpressError');
const Comment=require('../models/comment');
const { findById } = require('../models/comment');


module.exports.post=async(req,res)=>
{
   
console.log("Inside post Controller") 
  res.render('show');
}

module.exports.createPost=catchAsync(async(req,res,next)=>
{
 
 
const PostSchema=Joi.object({
 
  title:Joi.string().required(),
  image:Joi.string(),
  text:Joi.string().required()
  
})

const {title,image,text,tag0,tag1,tag2}=req.body;

let tags=[tag0,tag1,tag2];
tags= tags.filter(i => i);
tags=tags.map(i=>i.toLowerCase());

const newPost=new Post({title,image,text,tags})
// console.log("newPost",newPost);
//  const{error}=PostSchema.validate(newPost);
//  if(error)
//  {
//    const msg=error.details.map(el=>el.message).join(',')
//    throw new ExpressError(msg,400);
//  }

const saved=await newPost.save();
if(saved)
{

console.log("Saved",saved);
res.redirect('/user/post');
}

})

module.exports.getPost=catchAsync(async(req,res)=>
{


let {page}=req.query;
let total=await Post.collection.countDocuments();
console.log("total",total,page);
if(!page)
{
  page=1;
}
let size=2;
let limit=parseInt(size);
let skip=(page-1)*size;

const posts=await Post.find().limit(limit).skip(skip);


res.render('show',{posts,total});

})


module.exports.getTaggedPost=catchAsync(async(req,res)=>
{

 const {tag}=req.params;
  console.log("Inside tagged psost",tag)
  

let {page}=req.query;
// console.log("total",total,page);
if(!page)
{
  page=1;
}
let size=2;
let limit=parseInt(size);
let skip=(page-1)*size;


const foundPost=await Post.findByTag(tag).limit(limit).skip(skip);
let total=await Post.findByTag(tag).count();


console.log("total",total)


  res.render('tagpost',{posts:foundPost,total,tag});


})


module.exports.editPost=catchAsync(async(req,res,next)=>
{
 
const {title,image,text}=req.body;
const {id}=req.params;

const foundUser=await Post.findByIdAndUpdate(id,{title,image,text});
if(foundUser)
{
  // console.log("Updated",foundUser);
  res.redirect('/user/post');
}
})


module.exports.viewPost=catchAsync(async(req,res,next)=>
{
 

const {id}=req.params;


const foundPost=await Post.findById(id).populate('comments');
const total=1;
console.log("Inside viewPost",foundPost)
if(foundPost)
{
  // console.log("Updated",foundUser);
  res.render('singlePost',{post:foundPost});
}
})



module.exports.deletePost=catchAsync(async(req,res)=>
{
 

const {id}=req.params;

const foundUser=await Post.findByIdAndDelete(id);
if(foundUser)
{
  // console.log("Updated",foundUser);
  res.redirect('/user/post');
}
})


//Comments

module.exports.addComment=catchAsync(async(req,res)=>
{
 
 const {id}=req.params;
 const {comment}=req.body;
 console.log("Check",id,comment) 
 const foundPost=await Post.findById(id);
 const newComment=new Comment({comment});
 console.log("Comment",newComment)
 foundPost.comments.push(newComment);
 await newComment.save();
 await foundPost.save();
 res.redirect(`/user/post/${id}`)


 


})