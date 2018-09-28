// connect to the mysql database

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '192.185.72.57',
  user     : 'arti17co_soen343',
  password : 'hy.$EA)MS4_.',
  database : 'arti17co_soen343'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;


