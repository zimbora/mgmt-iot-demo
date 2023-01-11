var express = require('express');
var httpStatus = require('http-status-codes');

var Client = require('../controllers/clients')

const router = express.Router();

router.use((req,res,next) => {
  log.debug("clients route");
  next();
});

router.route("/:client_id/devices")

  .get(Client.getDevices)

router.route("/:client_id/permissions")

  .post(Client.addPermission)
  .delete(Client.removePermission)
  .put(Client.updatePermission)

module.exports =  router;
