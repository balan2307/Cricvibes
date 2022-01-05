const express = require("express");
const router = express.Router();

const {storage}=require('../cloudinary')
const multer  = require('multer');
const upload = multer({ storage })
const userController=require('../controllers/userController')

router.route('/login')
.get((req,res)=>{
  res.render("auth/login")})
.post(userController.loginUser);

router.route('/register')
.get((req,res)=>res.render("auth/register"))
.post(userController.registerUser);

router.route('/check')
.get((req,res)=>res.send(req.session));

router.route('/home')
.get((req,res)=>res.render('show'))


router.route('/profile/:id')
.get(userController.getProfile)
.put(upload.fields([{
  name: 'profile_image', maxCount: 1
}, {
  name: 'cover_image', maxCount: 1
}]) ,userController.updateProfile)


router.route('/follow/:user_id')
.post(userController.addFollower);

router.route('/unfollow/:user_id')
.post(userController.removeFollower);

router.route('/:id/profile/coverimage')
.post(userController.deleteImage);

router.route('/:id/profile/profileimage')
.post(userController.deleteprofileImage);



module.exports=router;