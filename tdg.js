const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : '192.185.72.57',
    user     : 'arti17co_soen343',
    password : 'hy.$EA)MS4_.',
    database : 'arti17co_soen343'
});

connection.connect()

// Initialize the app
const app = express();

// https://expressjs.com/en/guide/routing.html
app.get('/post', function (req, res) {
    connection.connect();

    connection.query('SELECT * FROM Client', function (error, results, fields) {
      if (error) throw error;
      res.send(results);
      res.send('Wiki home page');
    });

    connection.end();
});
// Start the server
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/post to see posts');
});