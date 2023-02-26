const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Comment=require('./comment');
const User = require('./user');


const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        url:String,
        filename:String
       
    },
    text:{
        type:String,
        required:true
          
    },
    tags:{
        type:Array
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }],
    upvotes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    downvotes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'

    },
    sharedBy:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    time:{
        type:Number
    },
    posted:{
        type:String
    }

})


postSchema.statics.findByTag=function(tag){

    console.log("tags ",tag)
    return this.find({tags:{$in:[tag]}})
}

postSchema.statics.findAllposts=async function(user,feeds)
{
   
    let posts=await Post.find({user:{$in:feeds}}).populate('user');
    let sposts=await Post.findSharedposts(feeds);
    let allposts=[...posts,...sposts];
    return allposts;

}

postSchema.statics.findSharedposts=async function(feeds)
{


    let sposts=[];
    let posts;
    // console.log("Feeds",feeds.length)
    
      for(let i=0;i<feeds.length;i++)
      {
        let feed=feeds[i];
        let user;
        let user_name
        user=await User.findById(feed.valueOf())
        user_name=user.username;
        
       
        
        posts=await Post.find({"sharedBy":feed.valueOf()}).populate('user')
        let id=await User.findById(feed.valueOf())
        let sharedposts=id.shared;
        let time;

        // console.log("Shared posts",sharedposts);
        //get posts.id 
        //find user with feed.valueOf and compare shared array and find post.id to get time
        for(let i=0;i<posts.length;i++)
        {
            sharedposts.forEach((item) => {
                if (item.id.valueOf() == posts[i].id) {
                   time=item.time;
                   console.log("TIme",time);
                }
            });
           if(time)
           {
               posts[i]["time"]=time;
           }
           posts[i]["shareduser"]=user_name;
           posts[i]["sharedid"]=feed.valueOf();
           console.log("Pushed",posts[i]);
           sposts.push(posts[i]);
           console.log("testing",sposts.length);

        }
        
        

        }
      
        console.log("Inside func");

        
    
    console.log("pretest",sposts.length);
   return sposts;

}


postSchema.post('findOneAndDelete',async function(doc){

await Comment.deleteMany({_id:{$in:doc.comments}});


})

const Post=mongoose.model('Post',postSchema);

module.exports=Post;