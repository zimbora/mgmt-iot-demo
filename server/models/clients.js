var mysql = require('mysql2');
var db = require('../controllers/db');

module.exports =  {

  add : (clientid,user,cb)=>{

    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        let query = "INSERT INTO ?? (??,??) VALUES (?,?)";
        let table = ["clients","idclients","users_idusers",clientid,user];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          if(err) console.log(err)
          db.close_db_connection(conn);
          if(err) cb(err,null);
          else cb(null,rows);
        });
      }
    });
  },

  delete : (clientid,cb)=>{

    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        let query = "DELETE FROM ?? where ?? = ?";
        let table = ["permissions","clients_idclients",clientid];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          if(err){
            db.close_db_connection(conn);
            return cb(err,null);
          }
          else{
            let query = "DELETE FROM ?? where ?? = ?";
            let table = ["clients","idclients",clientid];
            query = mysql.format(query,table);
            conn.query(query,function(err,rows){
              if(err) return cb(err,null);
              else return cb(null,rows);
            });
          }
        });
      }
    });
  },

  update : (clientid,user,cb)=>{

    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        let query = "UPDATE ?? set ?? = ? where ?? = ?";
        let table = ["clients","users_idusers",user,"idclients",clientid];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          db.close_db_connection(conn);
          if(err) cb(err,null);
          else cb(null,rows);
        });
      }
    });
  },

  list : (cb)=>{
    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        var query = `select * from clients inner join users where users.idusers = clients.users_idusers`;
        var table = [];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          db.close_db_connection(conn);
          if(err) cb(err,null);
          else cb(null,rows);
        });
      }
    });
  },

  getDevices : (clientid,cb)=>{
    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        var query = `select devices_uid,model,fw_version,app_version,status from ?? inner join ?? where ?? = ? and permissions.devices_uid = devices.uid`;
        var table = ["permissions","devices","clients_idclients",clientid];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          db.close_db_connection(conn);
          if(err) cb(err,null);
          else cb(null,rows);
        });
      }
    });
  },

  addPermission : (clientid,device,level,cb)=>{

    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        let query = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
        let table = ["permissions","clients_idclients","devices_uid","level",clientid,device,level];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          if(err) console.log(err)
          db.close_db_connection(conn);
          if(err) cb(err,null);
          else cb(null,rows);
        });
      }
    });
  },

  removePermission : (clientid,device,cb)=>{

    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        let query = "DELETE FROM ?? where ?? = ? and ?? = ?";
        let table = ["permissions","clients_idclients",clientid,"devices_uid",device];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          db.close_db_connection(conn);
          if(err) return cb(err,null);
          else return cb(null,rows);
        });
      }
    });
  },

  updatePermission : (clientid,device,cb)=>{

    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        let query = "UPDATE ?? set ?? = ?, ?? = ? where ?? = ?";
        let table = ["permissions","clients_idclients",clientid,"devices_uid",device];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          db.close_db_connection(conn);
          if(err) cb(err,null);
          else cb(null,rows);
        });
      }
    });
  },
};
