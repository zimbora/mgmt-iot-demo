var path = require('path');
var express = require('express');
//const session = require('express-session');
const session = require('cookie-session');
var expressValidation = require('express-validation');
var useragent = require('express-useragent');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var httpStatus = require('http-status-codes');
const fileUpload = require('express-fileupload');
var config = require('./config/env');

var auth = require('./server/controllers/auth');
var routes = require('./server/routes');
var token = require('./config/token');
var validate = require('./server/controllers/params_validator');
var user = require('./server/controllers/users');

var serveIndex = require('serve-index'); // well known

const app = express();

app.use(useragent.express());
app.use(bodyParser.json());

//app.use('/api', token, routes); // check token later
app.use('/api', routes);

app.use('/api', (req,res) => {
  res.status(httpStatus.BAD_GATEWAY)
    .json({
      status: "error",
      message: 'path not available'
    });
});

app.use(session({secret: config.jwtSecret}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(fileUpload());

app.set('view engine', 'ejs');  // set the view engine to ejs

app.use('*/assets', express.static(path.join(__dirname, 'server/public/assets')))


app.use((req,res,next) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  //log.debug("platform:",req.device.platform);
  //log.debug(req.body);
  next();
});

/*
app.use('/gauth', (req,res,next)=>{
  res.render(config.public_path+'/views/pages/gauth');
});

app.use('/gauth2', (req,res,next)=>{
  res.render(config.public_path+'/views/pages/gauth2');
});

app.post('/login',validate.body([{
    param_key: 'user',
    required: true,
    type: 'string',
    validator_functions: [(param) => {return param.length > 1}]
  },{
    param_key: 'password',
    required: true,
    type: 'string',
    validator_functions: [(param) => {return param.length > 1}]
  }]),auth.authenticate,auth.generateToken,auth.respondJWT);

app.post('/login/google/user',validate.body([{
    param_key: 'token',
    required: true,
    type: 'string',
    validator_functions: [(param) => {return param.length > 1}]
  }]),auth.authenticate_google,auth.generateToken,auth.respondJWT);

app.post('/login/app',validate.body([{
    param_key: 'email',
    required: true,
    type: 'string',
    validator_functions: [(param) => {return param.length > 1}]
  },{
    param_key: 'token',
    required: true,
    type: 'number',
    validator_functions: [(param) => {return param.length > 1}]
  }]),auth.authenticate_android,auth.generateToken,auth.respondJWT);

app.use(auth.check_authentication,(req,res,next)=>{
  if(!req.user){
    log.warn("not authenticated")
    if(req.useragent.isMobile)
      res.render(config.public_path+'/views/pages/login');
    else
      res.render(config.public_path+'/views/pages/login');
      //res.render('../server/public/views/pages/login');
  }else next()
},user.getInfo);
*/

app.use('*/js',express.static(path.join(__dirname, 'server/public/js')))
app.use('*/lib',express.static(path.join(__dirname, 'server/public/lib')))
app.use('*/files',express.static(path.join(__dirname, 'server/public/files')))

app.get('/logout',(req,res)=>{
  //let host = req.protocol + '://' + req.get('host');
  let host = req.protocol + '://' + config.domain;
  auth.deauth(req,res,(req,res)=>{
    res.redirect(host);
  });
});

// --- HOME ---
app.get('/home',(req,res)=>{
  res.render(config.public_path+'/views/pages/dashboard',{user:req.user,page:'Dashboard'});
});

// --- users ---
/*
app.get('/users',(req,res)=>{
  res.render(config.public_path+'/views/pages/users_list',{user:req.user,page:'Users'});
});

app.get('/user/:user_id',(req,res)=>{
  res.json({'msg':'In development'});
});
*/

// --- mqtt users ---
app.get('/users',(req,res)=>{
  res.render(config.public_path+'/views/pages/users_list',{user:req.user,page:'Users'});
});
// --- ----- ---

// --- mqtt clients ---
app.get('/clients',(req,res)=>{
  res.render(config.public_path+'/views/pages/clients_list',{user:req.user,page:'Clients'});
});

app.get('/client/:client_id',(req,res)=>{
  if(req.originalUrl.endsWith("/"))
    res.redirect(req.protocol + '://' + req.get('host') + req.originalUrl + "access");
  else
    res.redirect(req.protocol + '://' + req.get('host') + req.originalUrl + "/access");
});

//app.get('/device/:device_id/access',user.checkUserDeviceAccess,(req,res,next)=>{
app.get('/client/:client_id/access',(req,res,next)=>{
  //if(req.user.level > 3)
    res.render(config.public_path+'/views/pages/client/access',{user:req.user,page:'Access'});
});

// --- devices ---

app.get('/devices',(req,res)=>{
  res.render(config.public_path+'/views/pages/devices_list',{user:req.user,page:'Devices'});
});

//app.get('/device/:device_id',user.checkUserDeviceAccess,(req,res)=>{
app.get('/device/:device_id',(req,res)=>{
  if(req.originalUrl.endsWith("/"))
    res.redirect(req.protocol + '://' + req.get('host') + req.originalUrl + "settings");
  else
    res.redirect(req.protocol + '://' + req.get('host') + req.originalUrl + "/settings");
});

//app.get('/device/:device_id/dashboard',user.checkUserDeviceAccess,(req,res)=>{

app.get('/device/:device_id/settings',(req,res)=>{
  //if(req.user.level > 3)
  res.render(config.public_path+'/views/pages/device/settings',{user:req.user,page:'Settings'});
});

app.get('/device/:device_id/access',user.checkUserDeviceAccess,(req,res,next)=>{
  //if(req.user.level > 3)
    res.render(config.public_path+'/views/pages/device/access',{user:req.user,page:'Access'});
});

app.get('/device/:device_id/autorequests',user.checkUserDeviceAccess,(req,res)=>{
  //if(req.user.level > 1)
    res.render(config.public_path+'/views/pages/device/autorequests',{user:req.user,page:'Autorequests'});
});

app.get('/device/:device_id/alarms',user.checkUserDeviceAccess,(req,res)=>{
  //if(req.user.level > 3)
    res.render(config.public_path+'/views/pages/device/alarms',{user:req.user,page:'Alarms'});
});

app.get('/device/:device_id/jscode',user.checkUserDeviceAccess,(req,res)=>{
  //if(req.user.level > 3)
    res.render(config.public_path+'/views/pages/device/jscode',{user:req.user,page:'JSCODE'});
});

app.get('/device/:device_id/rs485',user.checkUserDeviceAccess,(req,res)=>{
  //if(req.user.level > 3)
    res.render(config.public_path+'/views/pages/device/rs485',{user:req.user,page:'RS485'});
});

//app.use(routes);

app.use((req,res,next)=>{
  res.redirect(req.protocol + '://' + req.get('host') +'/home');
});

app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    res.status(err.status).json(err);
  } else {
    res.status(500)
      .json({
        status: err.status,
        message: err.message
      });
  }
});

module.exports = app;
