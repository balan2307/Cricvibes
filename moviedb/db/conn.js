
const mongoose  = require('mongoose');



const mongoDB_init=()=>{
    const db=process.env.DATABASE;
    mongoose.connect(db,
    {
        useNewUrlParser:true,
      
       
        useUnifiedTopology:true,
        
    }
    ).then(()=>console.log("Connection established"))
    .catch((err)=>console.log("Oh no Error"+err))

    
}

module.exports=mongoDB_init;
