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
console.log("Test0");
const {title,image,text,tag0,tag1,tag2}=req.body;
console.log("Test1");
let tags=[tag0,tag1,tag2];
tags= tags.filter(i => i);
tags=tags.map(i=>i.toLowerCase());
console.log("Test2");
console.log("Tags",tags)
const newPost=new Post({title,image,text,tags})
const saved=await newPost.save();
if(saved)
{

console.log("Saved",saved);
res.redirect('/user/post');
}

}

module.exports.getPost=async(req,res)=>
{


let {page}=req.query;
let total=await Post.collection.countDocuments();
console.log("total",total,page);
if(!page)
{
  page=2;
}
let size=2;
let limit=parseInt(size);
let skip=(page-1)*size;

const posts=await Post.find().limit(limit).skip(skip);


res.render('show',{posts,total});

}


module.exports.getTaggedPost=async(req,res)=>
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