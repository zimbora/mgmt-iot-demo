var mysql = require('mysql2');
var db = require('../controllers/db');

module.exports = {

  add : (user,pwd,level,cb)=>{

    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        let query = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
        let table = ["users","idusers","password","level",user,pwd,level];
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

  delete : (user,cb)=>{

    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        let query = "DELETE FROM ?? where ?? = ?";
        let table = ["users","idusers",user];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          if(err){
            db.close_db_connection(conn);
            return cb(err,null);
          }else{
            return cb(null,rows);
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

  update : (user,pwd,level,cb)=>{

    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        let query = "UPDATE ?? set ?? = ?, ??=? where ?? = ?";
        let table = ["users","password",pwd,"level",level,"idusers",user];
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
        var query = `select * from users`;
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

  checkAdminAccess : (id,cb)=>{
    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        var query = `select * from ?? where ?? = ?`;
        var table = ["user_type","id",id];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          db.close_db_connection(conn);
          if(err) cb(err,null);
          else if(rows.length > 0) cb(null,rows[0]);
          else cb(null,null);
        });
      }
    });
  },

  findUserByToken : (token,cb)=>{

    // move it to clients.js

    // get id associated to token
    db.getConnection((err,conn) => {
      if(err)
        cb(err,null)
      else{
        var query = `select * from ?? where ?? = ?`;
        var table = ["users","api_token",token];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          db.close_db_connection(conn);
          if(err) cb(err,null);
          else if(rows.length > 0) cb(null,rows[0]);
          else cb(null,null);
        });
      }
    });
  },

  findUser : (nick,pwd,cb)=>{
    // get id associated to token
    db.getConnection((err,conn) => {
      if(err) cb(err,null)
      else{
        var query = `select * from ?? where ?? = ? and ?? = ?`;
        var table = ["users","idusers",nick,"password",pwd];
        query = mysql.format(query,table);
        conn.query(query,function(err,rows){
          db.close_db_connection(conn);
          if(err) cb(err,null);
          else if(rows.length > 0) cb(null,rows[0]);
          else cb(null,null);
        });
      }
    });
  },

}
