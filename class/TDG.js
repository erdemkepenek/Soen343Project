const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

class TDG {
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
	//Log in function, it takes the values from Mapper class and checks the database if it is valid entry
	login (email, password,callback){
		let sql= "SELECT FirstName,LastName, Address, email, phone, type  FROM Client WHERE email ='"+email+"' AND password = sha1('"+password+"')";
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
	//RegisterUser function, it takes the new user values from mapper class and registers it in the database
	registerUser(FirstName, LastName, Address, email, phone, type, password, callback){
		var sql = "INSERT INTO Client (FirstName, LastName, Address, email, phone, type, password) VALUES ('"+FirstName+"' , '"+LastName+"' ,'"+Address+"' ,'"+email+"' ,'"+phone+"' ,'"+type+"' ,sha1('"+password+"') )";
		this.runQuery(function(conn,completedQuery){
			conn.query(sql, (err, rows, fields) => {
				if (!err){
					if(rows.affectedRows==1){
						let msg = {};
						msg.success="true";
						msg.message="no message";
						msg.login = {
							FirstName: FirstName,
							LastName: LastName,
							Address: Address,
							email: email,
							phone: phone,
							type: type
						};
						callback(msg);
					}
					else{
						let msg = {};
						msg.success="false";
						msg.message=rows.message;
						callback(msg);
					}
				}	 
				else{
					// console.log(err);
					let msg = {};
					msg.success="false";
					msg.message=err.sqlMessage;
					callback(msg);
				}
				completedQuery("register");
			})
		})
	}
	deleteUser(email,callback){
		let sql = "DELETE from Client where email = '"+email+"'";
		this.runQuery(function(conn,completedQuery){
			conn.query(sql, (err, rows, fields) => {
				console.log(rows);
				if (!err){
					if(rows.affectedRows==1){
						let msg = {};
						msg.success="true";
						msg.message="deleted user with email "+email;
						callback(msg);
					}
					else{
						let msg = {};
						msg.success="false";
						if(rows.message==""){
							msg.message="user with email "+email+" does not exists";
						}
						else{
							msg.message=rows.message;
						}
						callback(msg);
					}
				}	 
				else{
					// console.log(err);
					let msg = {};
					msg.success="false";
					msg.message=err.sqlMessage;
					callback(msg);
				}
				completedQuery("delete user");
			})
		})
		
	}
	//fetchUsers function, it takes all the users from the database and transfers them to the mapper.
	fetchUsers(callback){
		let sql='SELECT FirstName, LastName, Address, email, phone, type FROM Client';
		this.runQuery(function(conn,completedQuery){
			conn.query(sql, (err, rows, fields) => {
				if (!err){
					if(rows.length>0){
						let msg = {};
						msg.success="true";
						msg.message="no message";
						msg.users = rows;
						callback(msg);
					}
					else{
						let msg = {};
						msg.success="false";
						if(rows.messages || rows.message==""){
							msg.message="empty client table";
						}
						else{
							msg.message=rows.message;
						}
						callback(msg);
					}
				}	 
				else{
					// console.log(err);
					let msg = {};
					msg.success="false";
					msg.message=err.sqlMessage;
					callback(msg);
				}
				completedQuery("fetch users");
			})
		})
	}
	insertItem(type, obj_parameter){
		let sql;
		switch(type){
			case "Book":
				sql = "INSERT INTO Book(Title, Author, Format, Pages, Publisher, `ISBN-10`, `ISBN-13`, Status, Quantity, Language) "+
							"VALUES('"+obj_parameter.Title+"', '"+obj_parameter.Author+"', '"+obj_parameter.Format+"', '"+obj_parameter.Pages+"', '"+obj_parameter.Publisher+"', "+obj_parameter.ISBN_10+", "+obj_parameterb.ISBN_13+", '"+obj_parameter.Status+"', '"+obj_parameter.Quantity+"', '"+obj_parameter.Language+"')";
							break;

			case "Magazine": sql = "INSERT INTO Magazine (Title, Publisher, `ISBN-10`, `ISBN-13`, Language) "+
							"VALUES('"+obj_parameter.Title+"', '"+obj_parameter.Publisher+"', "+obj_parameter.ISBN_10+", "+obj_parameter.ISBN_13+",'"+obj_parameter.Language+"')";
							break;
			
			case "Movie":
				sql = "INSERT INTO Movie(Title, Director, Producers, Actors, Language, Subtitles, Dubbed,ReleaseDate, RunTime, Status) "+
							"VALUES('"+obj_parameter.Title+"', '"+obj_parameter.Director+"', '"+obj_parameter.Producers+"', '"+obj_parameter.Actors+"', '"+obj_parameter.Language+"', '"+obj_parameter.Subtitles+"', '"+obj_parameter.Dubbed+"', '"+obj_parameter.ReleaseDate+"', '"+obj_parameter.RunTime+"', '"+obj_parameter.Status+"')";
							break;
			
			case "Music":
				sql = "INSERT INTO Music(Title , Artist, Label, Type, Quantity, ReleaseDate, ASIN, Status)"+
							"VALUES('"+obj_parameter.Title+"', '"+obj_parameter.Artist+"', '"+obj_parameter.Label+"', '"+obj_parameter.Type+"', '"+obj_parameter.Quantity+"', '"+obj_parameter.ReleaseDate+"', '"+obj_parameter.ASIN+"', '"+obj_parameter.Status+"')";
							break;
		}
		
		console.log(sql);
	}
	// modify an item given it id
	modifyItem(type, obj_parameter){
 	switch(type){
 		case "Book":
 			var sql= "UPDATE Book SET Title= obj_parameter.Title, Author= obj_parameter.Author, Format= obj_parameter.Format, Pages=obj_parameter.Pages, Publisher= obj_parameter.Publisher, ISBN-10= obj_parameter.`ISBN-10`, `ISBN-13`=obj_parameter.ISBN-13, Status= obj_parameter.Status, Quantity=obj_parameter.Quantity, Language=obj_parameter.Language WHERE id=obj_parameter.id ";
		case "Magazine":
			var sql= "UPDATE Magazine SET Title=obj_parameter.Title, Publisher=obj_parameter.Publisher, ISBN-10=obj_parameter.`ISBN-10`, `ISBN-13`=obj_parameter.ISBN-13, Language=obj_parameter.Language WHERE id=obj_parameter.id";
		case "Movie":
			var sql= "UPDATE Movie SET Title=obj_parameter.Title, Director= obj_parameter.Director, Producers= obj_parameter.Producers, Actors=obj_parameter.Actors, Language=obj_parameter.Language, Subtitles=obj_parameter.Subtitles, Dubbed=obj_parameter.Dubbed, ReleaseDate=obj_parameter.ReleaseDate, RunTime=obj_parameter.RunTime, Status=obj_parameter.Status";
		case "Music":
			var sql= "UPDATE Music SET Title=obj_parameter.Title, Artist=obj_parameter.Artist, Label=obj_parameter.Label, Type=obj_parameter.Type, Quantity=obj_parameter.Quantity, ReleaseDate=obj_parameter.ReleaseDate, ASIN=obj_parameter.ASIN, Status=obj_parameter.Status WHERE id=obj_parameter.id";
		}
	}
	// fetch all items from a specific type
	viewItems(type, callback){
		switch(type){
			case "Book":
				var sql= "SELECT * FROM Book";
			case "Magazine":
				var sql= "SELECT * FROM Magazine";
			case "Movie":
				var sql= "SELECT * FROM Movie";
			case "Music":
				var sql= "SELECT * FROM Music";
		}
		this.mysqlConnection.query(sql, (err, rows, fields) => {
			if (!err)
				 callback(JSON.stringify(rows));
			else
				callback("{}")
				console.log(err);
		})
	}
	deleteItem(type, obj_paramneter){
		switch(type)
		{
			case "Book": 
				var sql = "DELETE FROM Book  WHERE id = obj_parameter.id";
			case "Magazine":
				var sql  = "DELETE FROM Magazine WHERE id = obj_parameter.id";
			case "Movie":
				var sql = "DELETE FROM Movie WHERE id = obj_parameter.id";
			case "Music":
				var sql = "DELETE FROM Music WHERE id = obj_parameter.id ";
		}
	}
}
module.exports = TDG;

