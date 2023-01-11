module.exports = {
  env: 'production',
  db: {
    host:'localhost',
    user:'root',
    pwd:'lucatronica',
    name:'mqtt-aedes',
  },
  debug:{
    level: "trace"
  },
  domain: "my.dev.inloc.cloud",
  web_port: 24000,
  public_path:  '../../server/public',
  jwtSecret: 'my-api-secret',
  jwtDuration: '2 hours',
  token_mgmt: 'zxc',
};
