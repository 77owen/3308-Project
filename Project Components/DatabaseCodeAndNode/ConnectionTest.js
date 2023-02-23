//create access with mysql semantics
let mysql = require('mysql2');

//configuring connection
let config = require('./config.js');
let connection = mysql.createConnection(config);

//opening connection check
connection.connect(function(err) 
{
    if (err) 
    {
        return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

//closing connection
connection.end(function(err) 
{
    if (err) 
    {
        return console.log('error:' + err.message);
    }

    console.log('Closed the database connection.');
});