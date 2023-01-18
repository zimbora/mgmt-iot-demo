const env = process.env.NODE_ENV || 'development';

global.config = require(`./${env}`);

//module.exports = config;
