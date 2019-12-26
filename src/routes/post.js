const express = require('express');
const postController = require('../controllers/posts'); 
const authController = require("../controllers/auth");

//const {requireSignin} = require('../controllers/auth');

const router = express.Router();

router.post('/post', authController.requireSignin, postController.createPost);
router.get('/getAllPost' ,authController.requireSignin,postController.getAllPosts);
router.delete('/deletePost/:postId', authController.requireSignin,postController.deletePost);
router.get('/post/:postId',authController.requireSignin, postController.getPostById);



module.exports = router;