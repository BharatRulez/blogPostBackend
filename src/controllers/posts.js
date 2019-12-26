const _ = require('lodash');
const async = require('async');
const Post = require('../models/posts');

module.exports = {
    createPost : async (req, res) => {
       try{
        req.body.userId  =  req.user._id;
        const post = new Post(req.body);
        let savePost = await post.save();
        if(savePost){
             res.status(200).json({
                status : true,
                post :  savePost
            })
        }else{
           res.json({
               status : false,
               message : "Some error e=occured while creating post"
           }) 
        }
       }catch(e){
         res.json({
             status : false,
             error :  e
         })
       }
        
    },
    getAllPosts : async (req, res) => {
      try{
          let posts = await Post.find({});
          if(posts){
              res.json({
                  status : true,
                  posts : posts
              })
          }else{
              res,json({
                  status : true,
                  message : "No post available"
              })
          }

      }catch(e){
          res.json({
              status : false,
              error : e
          })
      }
    },
    getPostById : async (req,res) => {
        try{
            let post =  await Post.findById({ _id : req.params.postId});
            if(post){
                res.json({
                    status : true,
                    post : post
                })
            }else{
                res.json({
                    status : true,
                    message : "This post is not available"

                })
            }
        }catch(e){
            res.json({
                status : false,
                error : e
            })

        }
    },
    deletePost: async (req, res) => {
        let postId = req.params.postId;
        let userId = req.user._id;
        try{
            let resultPost = await Post.deleteOne({ $and: [ { _id : postId}, { userId: userId } ] });
            if(resultPost){
                res.json({
                    status : true,
                    message : "you have successfully deleted post"
                })
            }else{
                res.json({
                    status : true,
                    message : "Sorry you cant delete thsi post"
                })
            }
        }catch(e){
            res.json({
                status : false,
                error : e
            })
        }
      
      },
  
  

}

