const Joi = require('joi');
const Post=require('../models/post');
const User=require('../models/user');
const catchAsync=require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const expressError=require('../utils/ExpressError');
const Comment=require('../models/comment');
const { findById } = require('../models/comment');

const {cloudinary}=require('../cloudinary');


module.exports.post=async(req,res)=>
{
   
// console.log("Inside post Controller") 
  res.render('show');
}

module.exports.createPost=catchAsync(async(req,res,next)=>
{

  const d = new Date();
  let date_time = d.toLocaleString();
  console.log("date tesing")
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log("zone",timeZone); 
  console.log("date ",date_time)
 
const PostSchema=Joi.object({
 
  title:Joi.string().required(),
  image:Joi.string(),
  text:Joi.string().required(),

  
  
})




const {title,image,text,tag0,tag1,tag2}=req.body;

let tags=[tag0,tag1,tag2];
tags= tags.filter(i => i);
tags=tags.map(i=>i.toLowerCase().split("#")[1]);
let user=req.session.user;
let newPost;
if(req.file)
{
const {path,filename}=req.file;
newPost=new Post({title,image,text,tags,user});
newPost.image={url:path,filename:filename};
newPost.posted=date_time;
newPost.time=Date.now();

}
else
{

newPost=new Post({title,text,tags,user});
newPost.posted=date_time;
newPost.time=Date.now();
}

// console.log("User",user);
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

// console.log("Saved",saved);
res.redirect(`/user/profile/${user._id}`);
}

})


module.exports.homeroute=(req,res)=>
{
  
  res.redirect('/user/login');

}


module.exports.getPost=catchAsync(async(req,res)=>
{

let feeds=[];
// let sposts=[];
let user_name;
// feeds=req.session.user.following;
// let user=req.session.user._id;
let id=req.session.user._id;
let current_user=await User.findById(id);
let user=await User.findById(id);
// let sharedposts=await User.findById(id);
feeds=user.following;

const shared=current_user.shared;
const sposts=[]
for(let i=0;i<shared.length;i++)
{
    sposts.push(shared[i].id.valueOf())

}

// console.log("Before");
// sposts=await Post.findSharedposts(feeds);
// console.log("Spostss",sposts);
// console.log("After");




let {page}=req.query;
// let total=await Post.collection.countDocuments();

if(!page)
{
  page=1;
}
let size=2;
let limit=parseInt(size);
let skip=(page-1)*size;
// let posts=await Post.find({user:{$in:feeds}}).populate('user').limit(limit).skip(skip);
let allposts=await Post.findAllposts(user,feeds);
allposts=allposts.sort((a, b) => (a.time < b.time) ? 1 : -1)
// console.log("allposts",allposts)
let total=allposts.length;
// if(skip==0)
// {
//   let nposts=allposts.slice(skip,skip+2);

// }
let nposts=allposts.slice(skip,skip+2);

// console.log("Sliced",nposts);
// Post.findSharedposts(feeds)
// .then((data)=>
// {

// console.log("DATA",data)
// sposts=data;
// nposts
// res.render('show',{posts,sposts,current_user,total});
// })
res.render('show',{posts:nposts,current_user,sposts,total});
});




module.exports.getTaggedPost=catchAsync(async(req,res)=>
{

const {tag}=req.params;
  // console.log("Inside tagged psost",tag)
const id=req.session.user._id;
const cuser=await User.findById(id);

const shared=cuser.shared;
const sposts=[];
for(let i=0;i<shared.length;i++)
{
    sposts.push(shared[i].id.valueOf())

}


let {page}=req.query;
// console.log("total",total,page);
if(!page)
{
  page=1;
}
let size=2;
let limit=parseInt(size);
let skip=(page-1)*size;


let foundPost=await Post.findByTag(tag).populate('user').sort({time:-1}).limit(limit).skip(skip);
// foundPost=foundPost.sort((a, b) => (a.time < b.time) ? 1 : -1)

let total=await Post.findByTag(tag).count();




  res.render('tagpost',{posts:foundPost,total,cuser,sposts,tag});


})


module.exports.editPost=catchAsync(async(req,res,next)=>
{
 
// console.log("Edit");
const {title,image,text,tag0,tag1,tag2}=req.body;
console.log("IMage present or not",req.body.editImage);
const currentUser=req.session.user._id;
let path,filename;
if(req.file)
{

  path=req.file.path;
  filename=req.file.filename;
}
// console.log("Imaaage",req.file,"body",req.body);
console.log("Req.files",req.file);
let tags=[];

if(tag0)
{
  tags.push(tag0)
}
if(tag1)
{
  tags.push(tag1)
}
if(tag2)
{
  tags.push(tag2)
}

if(tags[0]) tags = tags.map(i => {
  const splitTags = i.toLowerCase().split("#");
  return splitTags.length > 1 ? splitTags[1] : splitTags[0];
});

// console.log("Tags",tags);
const {id}=req.params;
const getUser=await Post.findById(id);
// console.log("File check",req.file);
let imageobj={};
imageobj=getUser.image;
if(!req.file)
{ 

  console.log("No image",imageobj,imageobj.length,imageobj.length>=1);
  const edit_check= req.body.editImage;
  //  if(image) await cloudinary.uploader.destroy(imageobj.filename);
  
   if( !(Object.keys(imageobj).length === 0)) 
   {
     console.log("prev image found",imageobj);
     if(imageobj && imageobj.filename && edit_check=='false') await cloudinary.uploader.destroy(imageobj.filename);
   }
   if(edit_check=='false') imageobj={};
   
}
else
{

  
 console.log("Has a imageaaa");
  if( !(Object.keys(imageobj).length === 0)) 
  {
    console.log("prev image found",imageobj);
    if(imageobj && imageobj.filename) await cloudinary.uploader.destroy(imageobj.filename);
  }
  console.log("updating pic",path,filename);
  imageobj={url:path,filename:filename};
  console.log("iamge received",imageobj);
 
  
  
}



const foundUser=await Post.findByIdAndUpdate(id,{title,image:imageobj,text,tags});
if(foundUser)
{
  // console.log("Updated",foundUser);
  res.redirect(`/user/profile/${currentUser}`);
}
})


module.exports.viewPost=catchAsync(async(req,res,next)=>
{
 
const uid=req.session.user._id;
const cuser=await User.findById(uid);
const {id}=req.params;

const shared=cuser.shared;
const sposts=[];
for(let i=0;i<shared.length;i++)
{
    sposts.push(shared[i].id.valueOf())

}

const foundPost=await Post.findById(id).populate('user').populate({
  path:'comments',
  populate:{
    path:'user',
    select:{'_id':1,'username':1}
  }
 
});
const total=1;
// console.log("Inside viewPost",foundPost)
if(foundPost)
{
  // console.log("Updated",foundUser);
  res.render('singlePost',{post:foundPost,cuser,sposts});
}
})


module.exports.getPostdet=catchAsync(async(req,res,next)=>
{
 

const {id}=req.params;
// console.log("Getpostdet called");
const foundPost=await Post.findById(id);
// console.log("getpostdet",foundPost);
res.send(foundPost);


})



module.exports.deletePost=catchAsync(async(req,res)=>
{
 

const {id}=req.params;
const user=req.session.user._id;
const findPost=await Post.findById(id);
const filename=findPost.image.filename;
const shareduser=findPost.sharedBy;

for(let i=0;i<shareduser.length;i++)
{
  console.log(shareduser[i]);
  await User.findByIdAndUpdate(shareduser[i],{$pull:{shared:id}});
}


if(filename) await cloudinary.uploader.destroy(filename);
const foundUser=await Post.findByIdAndDelete(id);
if(foundUser)
{
  // console.log("Updated",foundUser);
  res.redirect(`/user/profile/${user}`);
}
})


//Comments

module.exports.addComment=catchAsync(async(req,res)=>
{
 
 const {id}=req.params;
 const {comment}=req.body;
//  console.log("Check",id,comment);
 const user=req.session.user._id; 
 const foundPost=await Post.findById(id);
 const newComment=new Comment({comment,user});
//  console.log("Comment",newComment)
 foundPost.comments.push(newComment);
 await newComment.save();
 await foundPost.save();
 res.redirect(`/user/post/${id}`)


 


})


module.exports.deleteComment=catchAsync(async(req,res)=>
{
 

const {id,cid}=req.params;
await Post.findByIdAndUpdate(id,{$pull:{comments:cid}});
await Comment.findByIdAndDelete(cid);
res.redirect(`/user/post/${id}`);


// const foundUser=await Post.findByIdAndDelete(id);
// if(foundUser)
// {
//   // console.log("Updated",foundUser);
//   res.redirect('/user/post');
// }
})


//voting




module.exports.upVote=catchAsync(async(req,res)=>
{
 
// console.log("IN upvote");  
const user=req.session.user._id;
const {id}=req.params;
const post=await Post.findByIdAndUpdate(id,{$pull:{downvotes:user}});
const post1=await Post.findByIdAndUpdate(id,{$push:{upvotes:user}});

if(post1)
{
  // console.log("Sucess")
  res.send("Success")
}
else
{
  res.send("Failure;")
}


})


module.exports.downVote=catchAsync(async(req,res)=>
{
 
  // console.log("IN Downvote");  
  const user=req.session.user._id;
  const {id}=req.params;
  const post=await Post.findByIdAndUpdate(id,{$pull:{upvotes:user}});
  const post1=await Post.findByIdAndUpdate(id,{$push:{downvotes:user}});
  // console.log("Saved",post);
  if(post1)
{
  res.send("Success")
}
else
{
  res.send("Failure;")
}


})

module.exports.removedownVote=catchAsync(async(req,res)=>
{
 
  // console.log("IN remove downvote");  
  const user=req.session.user._id;
  const {id}=req.params;
  const post=await Post.findByIdAndUpdate(id,{$pull:{downvotes:user}});
  // console.log("Saved",post)

  if(post)
{
  res.send("Success")
}
else
{
  res.send("Failure;")
}


})


module.exports.removeupVote=catchAsync(async(req,res)=>
{
 

  // console.log("IN remove upvote");  
  const user=req.session.user._id;
  const {id}=req.params;
  const post=await Post.findByIdAndUpdate(id,{$pull:{upvotes:user}});
  // console.log("Saved",post)
  if(post)
{
  res.send("Success")
}
else
{
  res.send("Failure;")
}


})


