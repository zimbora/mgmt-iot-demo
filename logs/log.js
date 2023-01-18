
global.log = require('console-log-level')({
  prefix: function (level) {
    return "["+Date.now()+"]"
  },
  level: config.debug.level
})

log.info("debug level:",config.debug.level)
