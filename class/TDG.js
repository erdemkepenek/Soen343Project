const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

class TDG {
	constructor(){
		this.mysqlConnection = mysql.createConnection({
			host: '192.185.72.57',
			user: 'arti17co_soen343',
			password: 'hy.$EA)MS4_.',
			database: 'arti17co_soen343',
			multipleStatements: true
		});
		this.returnData;
		this.mysqlConnection.connect((err) => {
			if (!err)
				console.log('DB connection succeded.');
			else
				console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
		});
	}
	login (email, password,callback){
		this.mysqlConnection.query("SELECT FirstName,LastName, Address, email, phone, type  FROM Client WHERE email ='"+email+"' AND password = '"+password+"';", (err, rows, fields) => {
			if (!err)
				 callback(JSON.stringify(rows));
			else
				console.log(err);
		})
	}


	registerUser(FirstName, LastName, Address, email, phone, type, password){

		var sql = "INSERT INTO Client (FirstName, LastName, Address, email, phone, type, password) VALUES ('"+FirstName+"' , '"+LastName+"' ,'"+Address+"' '"+email+"' ,'"+phone+"' ,'"+type+"' ,'"+password+"' )";

		this.mysqlConnection.query(sql, (err, rows, fields) => {
			if (!err)
			{
				console.log('hello');
				return true;
			}
				 
			else{
				console.log('failed');
				return false;
			}
				
		})
	}


	fetchUsers(callback){
		this.mysqlConnection.query('SELECT * FROM Client', (err, rows, fields) => {
			if (!err)
				 callback(JSON.stringify(rows));
			else
				callback("{}")
				console.log(err);
		})
	}
}
module.exports = TDG;

