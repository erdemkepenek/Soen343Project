// connect to the heroku database

var mysql = require('mysql')
var connection = mysql.createConnection({
    host     : '192.185.72.57',
    user     : 'arti17co_soen343',
    password : 'hy.$EA)MS4_.',
    database : 'arti17co_soen343'
});

connection.connect()

connection.query('SELECT * from Client', function (err, rows, fields) {
  if (err) throw err

  console.log('List of users: ', rows)
})

connection.end()