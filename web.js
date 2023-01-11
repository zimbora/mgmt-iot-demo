var web = require('./express-web');
var config = require('./config/env');

web.listen(config.web_port, () => {

  log.info('Web Server started and listening on port: ' +config.web_port + ' ' + config.env);
});

exports.web = web;
