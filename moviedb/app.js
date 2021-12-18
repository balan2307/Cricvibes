const express=require('express');
const dotenv=require('dotenv');
const app=express();
const path=require('path');
const methodOverride = require("method-override");
const mongoose  = require('mongoose');
const cookieParser = require("cookie-parser");
var morgan = require('morgan')
app.use(morgan('dev'))
const ExpressError=require('./utils/ExpressError');
const Joi=require('joi');

const session = require("express-session");
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
const mongoInit=require('./db/conn');
const Movie=require('./models/movie')
const InitRoutes=require('./routes/index');



dotenv.config();

app.use(
    session({
      secret: "topSecret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 2628000000,
      }
    })
  );

const db=process.env.DATABASE;
const port=process.env.PORT


mongoInit();
InitRoutes(app);
// const m=new Movie({
//     name:"Petta",
//     year:2019,
//     score:8
// })
// m.save().then((d)=>console.log(d));


app.get('/check',(req,res)=>
{
    res.send("Check");
  
})

app.all('*',(req,res,next)=>
{
   next(new ExpressError('Something went wrong',404))

})

app.use((err,req,res,next)=>
{
  const {statusCode=500 ,message='Something went wrong'}=err;
  console.log("Error :"+err);
  
  res.status(statusCode).render("error",{err});
})

app.listen(port,()=>
{
    console.log("Listening");
})