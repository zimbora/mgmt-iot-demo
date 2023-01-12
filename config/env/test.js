module.exports = {
  env: 'test',
  db: {
    host:'localhost',
    user:'root',
    pwd:'lucatronica',
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
