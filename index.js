require("./middleware")
require('./config/env');
require("./logs/log")

var iot;

if(config.env == "development")
  iot = require('../modules/mgmt-iot-web');
else
  iot = require('mgmt-iot-web');

log.info("process.env.NODE_ENV",process.env.NODE_ENV)
log.info("process.env.NODE_DEBUG",process.env.NODE_DEBUG)

iot.init(config);
global.iot_path = iot.path()
