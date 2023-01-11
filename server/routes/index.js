var express = require('express');
var httpStatus = require('http-status-codes');
var config = require('../../config/env');

var users = require('./users');
var clients = require('./clients');
var devices = require('./devices');
var authRoutes = require('./auth');

var Response = require('../controllers/response');
var User = require('../controllers/users');
var Client = require('../controllers/clients');
var Device = require('../controllers/devices');

const router = express.Router();

router.use((req,res,next) => {
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

/** GET /api-status - Check service status **/
router.get('/api-status', (req, res) =>
  res.status(httpStatus.OK)
    .json({
      status: "ok"
    })
);

//router.use('/user', User.checkUserOwnAccess,users);
router.use('/user', users);

router.route('/users')
  .get(User.list)
  .post(User.add)
  .delete(User.delete)
  .put(User.update)

router.use('/client', clients);
router.route('/clients')
  .get(Client.list)
  .post(Client.add)
  .delete(Client.delete)
  .put(Client.update)

router.use('/device', devices);

router.route('/devices/list')
  .get(Device.list);

//router.use('/user/:user_id',users); // use it to access to other user content - only for admin
router.use('/auth', authRoutes);

router.use((req,res,next) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  log.trace("route not found: "+fullUrl);
  Response.error(httpStatus.NOT_FOUND,"request not implemented");
});

module.exports =  router;
