// if(process.env.NODE_ENV!=="production"){
//   require('dotenv').config();
// }
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
const {storage}=require('./cloudinary')
const multer  = require('multer');
const upload = multer({ storage })
const flash = require("connect-flash");
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");



const session = require("express-session");
const MongoStore = require('connect-mongo');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use(mongoSanitize());




const mongoInit=require('./db/conn');
const Movie=require('./models/movie')
const InitRoutes=require('./routes/index');



dotenv.config();

const store=new MongoStore({
  mongoUrl:process.env.DATABASE,

  secret:"topSecret",
  touchAfter:24*60*60
});

store.on("error",function(e){
  console.log("Error",e);
})

app.use(
    
    session({
      store,
      name:'Session',
      secret: "topSecret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // secure:true,
        maxAge: 2628000000,
      }
    })
  );
app.use(flash());
// app.use(helmet());
// app.use(helmet({contentSecurityPolicy: false}));

app.use(helmet({ contentSecurityPolicy: false}));

const db=process.env.DATABASE;
const port=process.env.PORT

app.use((req, res, next) => {

  console.log("Reques",req.query);
  res.locals.user = req.session.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // console.log("Current user ",res.locals.user)
  next();
});



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