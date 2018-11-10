const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const encrypt = require("js-sha512"); 

class userTDG {
	//constructor is used to create a connection to the database
	constructor(){
		this.mysqlConnection = mysql.createPool({
			host: '192.185.72.57',
			user: 'arti17co_soen343',
			password: 'hy.$EA)MS4_.',
			database: 'arti17co_soen343',
			multipleStatements: true,
		});
		this.runQuery = function (queryBuild){
			let conn = this.mysqlConnection;
			queryBuild(conn,function(type){
				console.log("Completed query "+type+" \n");
			});
		};
	}
	login (email, password,callback){
		let sql= "SELECT FirstName,LastName, Address, email, phone, type FROM User WHERE email ='"+email+"' AND password = +'"+encrypt.sha512(password)+"'";
		this.runQuery(function(conn,completedQuery){
			conn.query(sql, (err, rows, fields) => {
				if (!err){
					if(rows.length==1){
						let msg = {};
						msg.success="true";
						msg.message="no message";
						msg.login=rows[0];
						callback(msg);
					}
					else{
						let msg = {};
						msg.success="false";
						msg.message="incorrect username or password";
						callback(msg);
					}
				}	 
				else{
					console.log(err);
					let msg = {};
					msg.success="false";
					msg.message="internal error";
					console.log(err);
					callback(msg);
				}
				completedQuery("login");
			})
		})
	}

	viewAllUsers(callback){
		let sql = 'SELECT * FROM User' ; 
		this.runQuery(function(conn,completedQuery){
			conn.query(sql, (err, rows, fields) => {
				if (!err){
					let msg = {};
					msg.success="true";
					msg.message="no message";
					msg.data=rows;
					callback(msg);
				}	 
				else{
					console.log(err);
					let msg = {};
					msg.success="false";
					msg.message=err.sqlMessage;;
					callback(msg);
				}
				completedQuery("View All Users");
			})
		})
	}

	addUser(user, callback){
		let sql = "INSERT INTO User (FirstName, LastName, Address, email, phone, type, password)"+
		"VALUES('"+user.FirstName+"', '"+user.LastName+"', '"+user.Address+"', '"+user.email+"', '"+user.phone+"', '"+user.type+"', '"+encrypt.sha512(user.password)+"');"
		this.runQuery(function(conn,completedQuery){
			conn.query(sql, (err, rows, fields) => {
				if (!err){
					let msg = {};
					msg.success="true";
					msg.message="no message";
					msg.data=rows;
					callback(msg);
				}	 
				else{
					console.log(err);
					let msg = {};
					msg.success="false";
					msg.message=err.sqlMessage;;
					callback(msg);
				}
				completedQuery("Add User");
			})
		})
	}
}
module.exports = userTDG;