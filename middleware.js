var express = require('express');

const middleware = express.Router();

// Pages not served by mgmt-iot module can be served by this middleware

middleware.use((req,res,next) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  req.device = {
    publicIP : req.header('x-forwarded-for') || req.connection.remoteAddress,
    platform : req.headers['user-agent']
  }

  log.trace("route url: "+fullUrl);
  //log.trace("public ip:",req.device.publicIP);
  //log.debug("platform:",req.device.platform);
  next();
});

middleware.get('/device/:device_id/dashboard',(req,res)=>{
  console.log("iot path:",global.iot_path)
  console.log("public_path:",config.public_path)
  res.render(config.public_path+'/views/pages/device/dashboard',{user:req.user,page:'Dashboard', path:global.iot_path});
});

middleware.use((req,res,next)=>{
  console.log("url not found");
  res.redirect(req.protocol + '://' + req.get('host') +'/home');
});

global.middleware = module.exports =  middleware;
