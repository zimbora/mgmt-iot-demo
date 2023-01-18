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
  web_port: 24000,
  public_path: '../server/public',
};
