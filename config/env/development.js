module.exports = {
  env: 'development',
  db: {
    host:'localhost',
    user:'user',
    pwd:'user_pwd',
    name:'mqtt-aedes',
  },
  debug:{
    level: "trace"
  },
  domain: "localhost",
  web_port: 24000,
  public_path:  '../server/public',
  jwtSecret: 'my-api-secret',
  jwtDuration: '2 hours',
  token_mgmt: 'zxc',
};
