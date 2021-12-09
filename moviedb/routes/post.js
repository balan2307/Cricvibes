const express = require("express");
const router = express.Router();

const postController=require('../controllers/postController')




router.route('/home')
.get(postController.post)

router.route('/user/post')
.get(postController.getPost)
.post(postController.createPost)

router.route('/user/post/:id')
.put(postController.editPost)
.delete(postController.deletePost)




module.exports=router;