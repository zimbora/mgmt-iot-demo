var User = require('../models/users');
var Joi = require('joi');
var httpStatus = require('http-status-codes');
var response = require('./response');
var config = require('../../config/env');

module.exports = {

  add : (req, res, next)=>{

    const val = Joi.object({
      user: Joi.string().required(),
      pwd: Joi.string().required(),
      level: Joi.number().required()
    }).validate(req.body);

    if(val.error){
      response.error(res,httpStatus.BAD_REQUEST,val.error.details[0].message)
    }else{
      User.add(req.body.user,req.body.pwd,req.body.level,(err,rows)=>{
        if(!err) response.send(res,rows);
        else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
      });
    }
  },

  delete : (req, res, next)=>{

    const val = Joi.object({
      user: Joi.string().required(),
    }).validate(req.body);

    if(val.error){
      response.error(res,httpStatus.BAD_REQUEST,val.error.details[0].message)
    }else{
      User.delete(req.body.user,(err,rows)=>{
        if(!err) response.send(res,rows);
        else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
      });
    }
  },

  update : (req, res, next)=>{

    const val = Joi.object({
      clientID: Joi.string().required(),
      user: Joi.string().required(),
      level: Joi.number().required()
    }).validate(req.body);

    if(val.error){
      response.error(res,httpStatus.BAD_REQUEST,val.error.details[0].message)
    }else{
      User.update(req.body.user,req.body.pwd,req.body.level,(err,rows)=>{
        if(!err) response.send(res,rows);
        else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
      });
    }
  },


  list : (req, res, next)=>{
    User.list((err,rows)=>{
      if(!err) response.send(res,rows);
      else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
    });
  },

  checkUserDeviceAccess,

}

function isAdmin(user){

  if(user.type == "admin")
    return true;
  else return false;
}

function checkAdminAccess(req,res,next){
  if(req.user.user_type_type == "collector" && req.user.cloud == 1){
    next();
  }else{
    User.checkAdminAccess(req.user.id,(err,rows)=>{
      if(err) next(err);
      else if(rows == null || rows.length == 0) res.json({"Error" : true, "Message" : "Not allowed", "Result" : null});
      else if(rows.length == 1 && rows[0].type != "admin") res.json({"Error" : true, "Message" : "Not allowed", "Result" : null});
      else next();
    });
  }
}

function checkUserOwnAccess(req, res, next) {
  if(req.user.id == req.params.user_id || req.user.id == req.query.user_id || isAdmin(req.user))
    next();
  else
    res.json({"Error" : true, "Message" : "Not allowed", "Result" : null});
}

function checkUserDeviceAccess(req, res, next) {

  return next();
  /*
  User.checkUserMapAccess(req.user.id,req.map.id,(err,rows)=>{
    if(err) next(err);
    else if(rows == null || rows.length == 0) res.json({"Error" : true, "Message" : "Not allowed", "Result" : null});
    else{
      req.user.level = rows[0].level;
      next();
    }
  });
  */
}
