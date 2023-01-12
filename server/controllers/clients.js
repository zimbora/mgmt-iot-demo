
var Client = require('../models/clients');

var Joi = require('joi');
var httpStatus = require('http-status-codes');
var response = require('./response');


module.exports = {

  add : (req, res, next)=>{

    const val = Joi.object({
      clientID: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required()
    }).validate(req.body);

    if(val.error){
      response.error(res,httpStatus.BAD_REQUEST,val.error.details[0].message)
    }else{
      Client.add(req.body.clientID,req.body.user,req.body.password,(err,rows)=>{
        if(!err) response.send(res,rows);
        else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
      });
    }
  },

  delete : (req, res, next)=>{

    const val = Joi.object({
      clientID: Joi.string().required()
    }).validate(req.body);

    if(val.error){
      response.error(res,httpStatus.BAD_REQUEST,val.error.details[0].message)
    }else{
      Client.delete(req.body.clientID,(err,rows)=>{
        if(!err) response.send(res,rows);
        else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
      });
    }
  },

  update : (req, res, next)=>{

    const val = Joi.object({
      clientID: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required()
    }).validate(req.body);

    if(val.error){
      response.error(res,httpStatus.BAD_REQUEST,val.error.details[0].message)
    }else{
      Client.update(req.body.clientID,req.body.user,req.body.password,(err,rows)=>{
        if(!err) response.send(res,rows);
        else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
      });
    }
  },


  list : (req, res, next)=>{
    Client.list((err,rows)=>{
      if(!err) response.send(res,rows);
      else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
    });
  },

  // get devices associated to client
  getDevices : (req, res, next)=>{
    Client.getDevices(req.params.client_id,(err,rows)=>{
      if(!err) response.send(res,rows);
      else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
    });
  },

  addPermission : (req, res, next)=>{

    const val = Joi.object({
      device: Joi.string().required(),
      level: Joi.number().required()
    }).validate(req.body);

    Client.addPermission(req.params.client_id,req.body.device,req.body.level,(err,rows)=>{
      if(!err) response.send(res,rows);
      else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
    });
  },

  removePermission : (req, res, next)=>{

    const val = Joi.object({
      device: Joi.string().required()
    }).validate(req.body);

    Client.removePermission(req.params.client_id,req.body.device,(err,rows)=>{
      if(!err) response.send(res,rows);
      else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
    });
  },

  updatePermission : (req, res, next)=>{

    const val = Joi.object({
      device: Joi.string().required(),
      level: Joi.number().required()
    }).validate(req.body);

    Client.updatePermission(req.params.client_id,req.body.device,req.body.level,(err,rows)=>{
      if(!err) response.send(res,rows);
      else response.error(res,httpStatus.INTERNAL_SERVER_ERROR,err);
    });
  },

  checkDeviceAccess : (req, res, next)=>{
    console.log("check device access for user")
    console.log(req.user)
    Client.checkDeviceAccess(req.user.id,req.user.level,req.params.device_id,(err,access)=>{
      if(err) res.json({"Error" : true, "Message" : err, "Result" : null});
      else if(!access) res.json({"Error" : true, "Message" : "Not allowed", "Result" : null});
      else next();
    });
  },

  checkAdminAccess : (req,res,next)=>{
    console.log("check admin access");
    console.log(req.user)
    if(req.user.level >= 4)
      next();
    else
      res.json({"Error" : true, "Message" : "Not allowed", "Result" : null})
  }


};
