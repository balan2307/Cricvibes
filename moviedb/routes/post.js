const express = require("express");
const router = express.Router();

const postController=require('../controllers/postController')


const isLoggedin=require('../middlewares/user_auth')

router.route('/home')
.get(postController.post)

router.route('/user/post')
.get(isLoggedin,postController.getPost)
.post(isLoggedin,postController.createPost)


router.route('/post/:tag')
.get(isLoggedin,postController.getTaggedPost)


router.route('/user/post/:id')
.get(isLoggedin, postController.viewPost)
.put(isLoggedin,postController.editPost)
.delete(isLoggedin,postController.deletePost)

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