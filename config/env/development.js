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
  web_port: 80,
  public_path: '../server/public',
};
