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
	// modify an item given it id
	modifyItem(type, obj_parameter){
 	switch(type){
 		case "Book":
 			var sql= "UPDATE Book SET Title= obj_parameter.Title, Author= obj_parameter.Author, Format= obj_parameter.Format, Pages=obj_parameter.Pages, Publisher= obj_parameter.Publisher, ISBN-10= obj_parameter.ISBN-10, ISBN-13=obj_parameter.ISBN-13, Status= obj_parameter.Status, Quantity=obj_parameter.Quantity, Language=obj_parameter.Language WHERE id=obj_parameter.id ";
		case "Magazine":
			var sql= "UPDATE Magazine SET Title=obj_parameter.Title, Publisher=obj_parameter.Publisher, ISBN-10=obj_parameter.ISBN-10, ISBN-13=obj_parameter.ISBN-13, Language=obj_parameter.Language WHERE id=obj_parameter.id";
		case "Movie":
			var sql= "UPDATE Movie SET Title=obj_parameter.Title, Director= obj_parameter.Director, Producers= obj_parameter.Producers, Actors=obj_parameter.Actors, Language=obj_parameter.Language, Subtitles=obj_parameter.Subtitles, Dubbed=obj_parameter.Dubbed, ReleaseDate=obj_parameter.ReleaseDate, RunTime=obj_parameter.RunTime, Status=obj_parameter.Status";
		case "Music":
			var sql= "UPDATE Music SET Title=obj_parameter.Title, Artist=obj_parameter.Artist, Label=obj_parameter.Label, Type=obj_parameter.Type, Quantity=obj_parameter.Quantity, ReleaseDate=obj_parameter.ReleaseDate, ASIN=obj_parameter.ASIN, Status=obj_parameter.Status WHERE id=obj_parameter.id";
		}
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
	inserItem(type, obj_parameter)
	{
		switch(type)
		{
			

			case "Book":
				var sql = "INSERT INTO Book(id, Title, Author, Format, Pages, Publisher, ISBN-10, ISBN-13, Status, Quantity, Language) VALUES(obj_parameter.id, obj_parameter.Title, obj_parameter.Author, obj_parameter.Format, obj_parameter.Pages, obj_parameter.Publisher, obj_parameter.ISBN-10, obj_parameter.ISBN-13, obj_parameter.Status, obj_parameter.Quantity, obj_parameter.Language)";

			case "Magazine":
				var sql = "INSERT INTO Magazine(id, Title, Publisher, ISBN-10, ISBN-13, Language)"
				+"VALUES(obj_parameter.id, obj_parameter.Title, obj_parameter.Publisher, obj_parameter.ISBN-10, obj_parameter.ISBN-13,obj_parameter.Language)";
			
			case "Movie":
			 var sql = "INSERT INTO Movie(id, Title, Director, Producers, Actors, Language, Subtitles, Dubbed,ReleaseDate, RunTime, Status) "+
			 "VALUES(obj_parameter.id, obj_parameter.Title, obj_parameter.Director, obj_parameter.Producers, obj_parameters.Actors, obj_parameter.Language, obj_parameter.Subtitles, obj_parameter.Dubbed, obj_parameter.ReleaseDate, obj_parameter.RunTime, obj_parameter.Status)";
			
			case "Music":
				var sql = "INSERT INTO Music(id, Title , Artist, Label, Type, Quantity, ReleaseDate, ASIN, Status)"
				+ "VALUES(obj_parameter.id, obj_parameter.Title, obj_parameter.Artist, obj_parameter.Label"
					+"obj_parameter.Type, obj_parameter.Quantity, obj_parameter.ReleaseDate, obj_parameter.ASIN, obj_parameter.Status)";
		}
	}
}
module.exports = TDG;

