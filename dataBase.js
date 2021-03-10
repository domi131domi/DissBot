const mysql = require("mysql");
require("dotenv").config();
var Promise = require("promise");

const dbConfig = {
  host: process.env.hostDB,
  user: process.env.loginDB,
  password: process.env.PASSDB,
  database: process.env.nameDB
};

module.exports.Init = () => {
  var con = mysql.createConnection({
    host: process.env.hostDB,
    user: process.env.loginDB,
    password: process.env.PASSDB
  });
  con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.nameDB}`, function (err, result) {
    if (err) throw err;
    con.changeUser({
      database: process.env.nameDB
    }, function (err) {
      if (err) {
        console.log('Error in changing database', err);
        return;
      }
      con.query("CREATE TABLE IF NOT EXISTS DISS_LINES (DISCORD_NR VARCHAR(255), LINE VARCHAR(255))", (err, result) => {
        if (err) throw err;
      });
    })
  });
}



module.exports.getStandardLines = () => {
  return new Promise((resolve, reject) => {
    var con = mysql.createConnection(dbConfig);
    con.connect(() => {
      con.query(`SELECT LINE FROM DISS_LINES WHERE DISCORD_NR IS NULL`, (err, result, fields) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
    })
  })
}