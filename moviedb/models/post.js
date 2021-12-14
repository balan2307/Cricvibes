const mongoose=require('mongoose');


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
    }
})


postSchema.statics.findByTag=function(tag){

    return this.find({tags:{$in:[tag]}})
}
const Post=mongoose.model('Post',postSchema);

module.exports=Post;