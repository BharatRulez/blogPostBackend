const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

require("dotenv").config();
const User = require("../models/user");


module.exports = {

    signin: async (req, res) => {

        try {
            let user = await User.findOne({
                email: req.body.email
            });
            if (!user) {
                return res.status(401).json({
                    error: "User with that email does not exist"
                });
            } else {
                if (!user.authenticate(req.body.password, user.password)) {
                    return res.status(401).json({
                      error: "Email and password do not match"
                    });
                  }
                //generate a token with user_id and secret
                const token = jwt.sign({
                    _id: user._id
                }, process.env.JWT_SECRET, {
                    expiresIn:  '7d',
                    });
               

                const expiration =  604800000;
          
                //persist the token as 't' in cookie with expiry date
                res.cookie('cookieName', 'cookieValue')
                
                  res.cookie('token', token, {
                    expire: new Date(Date.now() + expiration),
                    secure: false, // set to true if your using https
                    httpOnly: true,
                  });
               //return response with user and token to frontend client
                const {
                    _id,
                    fullName,
                    email
                } = user;
                 return  res.json({
                    token,
                    user: {
                        _id,
                        email,
                        fullName
                    }
                });
               
            }
          
        } catch (e) {
            return res.json({
                error: e
            })
        }

    },
    signup: async (req, res) => {
       
        try {
            const userExist = await User.findOne({
                email: req.body.email
            });
            if (userExist) {
                return res.status(403).json({
                    error: "Email is taken"
                });
            }

            const user = new User(req.body);
            const userSave = await user.save();
            if(userSave){
                res.json({
                    status : "true",
                    message : "you have successfully Signed Up"
                })
            }

        } catch (e) {
            res.json({
                error: e
            })
        }


    },
    requireSignin: (req, res, next) => {
        let userJwt =  req.headers.authorization.split(' ')[1];
        console.log(userJwt);
        if (!userJwt) {
          return res.status(401).json({
            error: "Invalid or missing authorization token"
          });
        }
        const userJwtPayload = jwt.verify(userJwt, process.env.JWT_SECRET);
        if (userJwtPayload) {
          req.user = userJwtPayload;
          next();
        } else {
          res.clearCookie("t");
          return res.status(401).json({
            error: "Invalid or missing authorization token"
          });
        }
      }
};