var config = require ('./env');
var jwt = require ('express-jwt');

const authenticate = jwt({
  secret: config.jwtSecret
});

exports.authenticate = authenticate;
