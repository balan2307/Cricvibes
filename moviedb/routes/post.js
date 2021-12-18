const express = require("express");
const router = express.Router();

const postController=require('../controllers/postController')




router.route('/home')
.get(postController.post)

router.route('/user/post')
.get(postController.getPost)
.post(postController.createPost)


router.route('/post/:tag')
.get(postController.getTaggedPost)


router.route('/user/post/:id')
.get(postController.viewPost)
.put(postController.editPost)
.delete(postController.deletePost)

router.route('/user/post/:id/comments')
.post(postController.addComment)






module.exports=router;