var express = require('express');
var httpStatus = require('http-status-codes');

//var User = require('../server/models/user');

const router = express.Router();

router.use((req, res, next) => {

  var token = req.headers['token']; // users

  if(token)
    return next();
    /*
    User.findUserByToken(token,(error,user) => {
      if(error){
        res.status(httpStatus.UNAUTHORIZED)
          .json({
            success: false,
            message: 'something went wrong on our side, sorry for that'
          });
      }else if(!user){
        res.status(httpStatus.UNAUTHORIZED)
          .json({
            success: false,
            message: 'api token not valid'
        });
      }else{
        if(user.api_current_rate > user.api_limit_rate){
          res.status(httpStatus.UNAUTHORIZED)
            .json({
              success: false,
              message: 'you have reached your credits limit'
            });
        }else{
          if(user != null)
            req.user = user;
          next();
        }
      }
    }, (e) => next(e));
    */
});

module.exports =  router;
