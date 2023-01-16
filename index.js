require("./logs/log")

log.info("process.env.NODE_ENV",process.env.NODE_ENV)
log.info("process.env.NODE_DEBUG",process.env.NODE_DEBUG)

var db = require('./server/controllers/db');

db.connect((err) => {
  if(!err) log.info("connected to DB");
  else log.error("error connecting to DB");
});

var rest_web = require("./web");
