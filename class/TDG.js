const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

class TDG {

	//constructor is used to create a connection to the database
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

	//Log in function, it takes the values from Mapper class and checks the database if it is valid entry
	login (email, password,callback){

		var sql= "SELECT FirstName,LastName, Address, email, phone, type  FROM Client WHERE email ='"+email+"' AND password = sha1('"+password+"')";
		console.log(sql);
		this.mysqlConnection.query(sql, (err, rows, fields) => {
			if (!err)
				 callback(JSON.stringify(rows));
			else
				console.log(err);
		})
	}

	//RegisterUser function, it takes the new user values from mapper class and registers it in the database
	registerUser(FirstName, LastName, Address, email, phone, type, password){

		var sql = "INSERT INTO Client (FirstName, LastName, Address, email, phone, type, password) VALUES ('"+FirstName+"' , '"+LastName+"' ,'"+Address+"' ,'"+email+"' ,'"+phone+"' ,'"+type+"' ,sha1('"+password+"') )";

		this.mysqlConnection.query(sql, (err,result)=>{
			if(err) {
				throw err;
				return false;
			}
			else{
				console.log("1 record inserted");
				return true;
			}
		})
	}

	//fetchUsers function, it takes all the users from the database and transfers them to the mapper.
	fetchUsers(callback){

		var sql='SELECT * FROM Client';

		this.mysqlConnection.query(sql, (err, rows, fields) => {
			if (!err)
				 callback(JSON.stringify(rows));
			else
				callback("{}")
				console.log(err);
		})
	}
}
module.exports = TDG;

