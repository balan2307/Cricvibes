const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Comment=require('./comment');


const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String
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

    }

})


postSchema.statics.findByTag=function(tag){

    return this.find({tags:{$in:[tag]}})
}


postSchema.post('findOneAndDelete',async function(doc){

await Comment.deleteMany({_id:{$in:doc.comments}});


})

const Post=mongoose.model('Post',postSchema);

module.exports=Post;