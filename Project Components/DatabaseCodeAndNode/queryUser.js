//begin don't touch
//
//if need to change database connection alter config.js file
//
let mysql = require('mysql2');
let config = require('./config.js');

let connection = mysql.createConnection(config);
// end don't touch

//pulls user info and displays to console
let sql = `SELECT * FROM userinfo`;
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});

connection.end(); 