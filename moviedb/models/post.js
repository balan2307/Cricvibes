const mongoose=require('mongoose');
const Schema=mongoose.Schema;


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
    }]
})


postSchema.statics.findByTag=function(tag){

    return this.find({tags:{$in:[tag]}})
}
const Post=mongoose.model('Post',postSchema);

module.exports=Post;