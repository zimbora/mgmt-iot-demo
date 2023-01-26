module.exports = {
  env: 'docker-dev',
  db: {
    host:'host.docker.internal',
    user:'user',
    pwd:'user_pwd',
    //pwd:'root_pwd',
    name:'mqtt-aedes',
  },
  debug:{
    level: "trace"
  },
  domain: "localhost",
  web_port: 80,
  public_path:  '../server/public',
  jwtSecret: 'my-api-secret',
  jwtDuration: '2 hours',
};
