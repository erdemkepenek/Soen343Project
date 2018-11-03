const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

class BookTDG {
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
	/*
		+ viewItems():
		+ addItem(): void
		+ modifyItem():
		+ deleteItem();
	*/
	viewItems(callback){
		let sql= '   SELECT bookdesc.iddesc, title, author, format, pages, publisher, `isbn-10`, `isbn-13`, language, Count(id) AS Quantity   '  + 
				 '   FROM   bookdesc   '  + 
				 '          LEFT JOIN bookph   '  + 
				 '                 ON bookph.iddesc = bookdesc.iddesc   '  + 
				 '  GROUP  BY ( bookdesc.iddesc )   ' ; 
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
				completedQuery("View Books");
			})
		})
	}
	addItem(item, callback){
		let sql=	 '   INSERT INTO `BookDesc` (`Title`, `Author`, `Format`, `Pages`, `Publisher`, `ISBN-10`, `ISBN-13`, `Language`)  '  + 
					 '   VALUES  '  + 
					 '       ("'+item.title+'", "'+item.author+'", "'+item.format+'", '+item.pages+', "'+item.publisher+'", '+item.ISBN10+', '+item.ISBN13+', '+item.language+');  '  + 
					 '   SET @last_id_book = LAST_INSERT_ID();  '  + 
					 '   INSERT INTO `Items` (id)  '  + 
					 '   VALUES  '  + 
					 '       (null);  '  + 
					 '   SET @last_id_item = LAST_INSERT_ID();  '  + 
					 '   INSERT INTO `BookPh` (idDesc, available, id)  '  + 
					 '   VALUES  '  + 
					 '      (@last_id_book, 1, @last_id_item);  ' ; 
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
				completedQuery("Add Books");
			})
		})
	}
	deleteItem(id,callback){
		let sql=  '  DELETE FROM `Items` where id = '+id+';  ' ;
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
				completedQuery("Delete Book");
			})
		})
	}
	modifyItem(item,callback){
		let sql='   UPDATE `BookDesc`  '  + 
				'   SET Title="'+item.title+'", Author="'+item.author+'", Format="'+item.format+'", Pages='+item.pages+', Publisher="'+item.publisher+'", `ISBN-10`='+item.ISBN10+', `ISBN-13`='+item.ISBN15+', Language='+item.language+'  '  + 
				'  WHERE idDesc=2;  ';
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
				completedQuery("Modify Book");
			})
		})
	}
}
module.exports = BookTDG;

