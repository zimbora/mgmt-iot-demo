var jwt = require('jsonwebtoken');

var config = require('../../config/env');
var User = require('../models/users');
var Client = require('../models/clients');
var Auth = require('../models/auth');

function check_authentication(req, res, next) {

  Auth.check_authentication(req.session.token,(authenticated,user)=>{
    if(authenticated) {
      req.user = user;
    }
    next()
  });
}

function authenticate_email(req, res, next) {

  User.findUserByEmail(req.body.email,req.body.password,(err,result)=>{
    if(err) res.json({message:"Failure"});
    else if(result == null) res.json({message:"wrong credentials"});
    else{
      req.user = result;
      next();
    }
  });
}

function authenticate(req, res, next) {
  Client.get(req.body.user,req.body.password,(err,result)=>{
    if(err) res.json({message:"Failure"});
    else if(result == null) res.json({message:"User and password doesn't match"});
    else{
      req.user = result;
      console.log("user",req.user)
      next();
    }
  });
}

function deauth(req, res, cb) {
  req.session.token = null;
  cb(res,res);
}

function generateToken(req, res, next) {
  if (!req.user) return next();

  const jwtPayload = {
    id: req.user.idusers,
    level: req.user.level
  };
  const jwtData = {
    expiresIn: config.jwtDuration,
  };
  const secret = config.jwtSecret;

  req.session.token = jwt.sign(jwtPayload, secret, jwtData);

  //User.updateWsToken(req.user.id,req.session.token.substr(req.session.token.length-20,req.session.token.length),(error,res)=>{log.debug(error,res)});

  next();
}

function respondJWT(req, res) {
  if (!req.user) {
    res.status(401).json({
      error: 'Unauthorized'
    });
  } else {
    res.status(200).json({
      message:"Success",
      token:req.session.token
    });
  }
}

module.exports = {
  check_authentication, authenticate_email, authenticate, deauth, generateToken, respondJWT
};
