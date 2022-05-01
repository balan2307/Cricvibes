const express = require("express");
const router = express.Router();
const {storage}=require('../cloudinary')
const multer  = require('multer');
const upload = multer({ storage })

const postController=require('../controllers/postController')


const isLoggedin=require('../middlewares/user_auth')

router.route('/').
get(postController.homeroute)

router.route('/home')
.get(postController.post)

router.route('/user/post')
.get(isLoggedin,postController.getPost)
.post(isLoggedin,upload.single('image'), postController.createPost)




router.route('/post/:tag')
.get(isLoggedin,postController.getTaggedPost)


router.route('/user/post/:id')
.get(isLoggedin, postController.viewPost)
.put(isLoggedin,upload.single('image'),postController.editPost)
.delete(isLoggedin,postController.deletePost)

router.route('/post/:id/getdet')
.get(postController.getPostdet);

router.route('/user/post/:id/comments')
.post(isLoggedin,postController.addComment)

router.route('/user/post/:id/comment/:cid')
.delete(isLoggedin,postController.deleteComment)



router.route('/user/post/:id/upvote')
.post(isLoggedin,postController.upVote)

router.route('/user/post/:id/downvote')
.post(isLoggedin,postController.downVote)


router.route('/user/post/:id/removedownvote')
.post(isLoggedin,postController.removedownVote)


router.route('/user/post/:id/removeupvote')
.post(isLoggedin,postController.removeupVote)

module.exports=router;