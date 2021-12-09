const mongoose=require('mongoose');


const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    score:{
        type:Number
        
    }
})

const Movie=mongoose.model('Movie',movieSchema);

module.exports=Movie;