var express = require('express');
var config = require('../../config/env');

var Device = require('../controllers/devices')

const router = express.Router();

router.use((req,res,next) => {
  log.debug("devices route");
  next();
});

router.route("/permission")
  /** POST /api/device/permission **/
  .post(Device.addClientPermission)
  /** DELETE /api/device/permission **/
  .delete(Device.deleteClientPermission)
  /** PUT /api/device/permission **/
  .put(Device.updateClientPermission)

router.route("/:device_id/clients")

  .get(Device.getClientsWithAccess)

router.route("/:device_id/info")

  .get(Device.getInfo)

router.route("/:device_id/autorequests")

  .get(Device.getAutorequests)

router.route("/:device_id/alarms")

  .get(Device.getAlarms)

router.route("/:device_id/jscode")

  .get(Device.getJSCode)

module.exports =  router;
