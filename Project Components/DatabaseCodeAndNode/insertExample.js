//need to run npm install mysql2 on an environment with nodeJS
//Tested most recently on Node v16.14.2
//
//begin don't touch
//
//if need to change database connection alter config.js file
//
let mysql = require('mysql2');
let config = require('./config.js');

let connection = mysql.createConnection(config);
// end don't touch

//Insert row
let sql = `INSERT INTO table_name (EXAMPLE, example)
           VALUES(VALUE, value)`;
           
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});

connection.end(); 