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
	viewItems(callback){
		let sql = 'SELECT BookDesc.idDesc, Title,Author,Format, Pages, Publisher, `ISBN-10`,`ISBN-13`, Language, COUNT(CASE WHEN available THEN 1 END)as available, COUNT(id) as Quantity FROM BookDesc LEFT JOIN BookPh ON BookPh.idDesc = BookDesc.idDesc GROUP BY (BookDesc.idDesc)' ;
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
				completedQuery("[BookTDG] viewBooks()");
			})
		})
	}
	addItem(item, callback){
		let sql=	 '   INSERT INTO `BookDesc` (`Title`, `Author`, `Format`, `Pages`, `Publisher`, `ISBN-10`, `ISBN-13`, `Language`)  '  + 
					 '   VALUES  '  + 
					 '       ("'+item.title+'", "'+item.author+'", "'+item.format+'", '+item.pages+', "'+item.publisher+'", '+item.ISBN10+', '+item.ISBN13+', "'+item.language+'");  '  + 
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
				completedQuery("[BookTDG] addItem()");
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
				completedQuery("[BookTDG] deleteItem()");
			})
		})
	}
	modifyItem(item,callback){
		let sql='   UPDATE `BookDesc`  '  + 
				'   SET Title="'+item.title+'", Author="'+item.author+'", Format="'+item.format+'", Pages='+item.pages+', Publisher="'+item.publisher+'", `ISBN-10`='+item.ISBN10+', `ISBN-13`='+item.ISBN13+', Language="'+item.language+'"  '  + 
				'  WHERE idDesc='+item.idDesc+';  ';
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
				completedQuery("[BookTDG] modifyItem()");
			})
		})
	}
}
module.exports = BookTDG;

