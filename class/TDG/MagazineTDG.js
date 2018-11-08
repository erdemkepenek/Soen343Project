const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

class MagazineTDG {
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
		let sql = 'SELECT MagazineDesc.idDesc, Title, Publisher, Language, `ISBN-10`,`ISBN-13`, COUNT(id) as Quantity FROM MagazineDesc LEFT JOIN MagazinePh ON MagazinePh.idDesc = MagazineDesc.idDesc GROUP BY (MagazineDesc.idDesc)' ; 
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
				completedQuery("View Magazines");
			})
		})
	}
	addItem(item, callback){
		let sql=	 '   INSERT INTO `MagazineDesc` (`Title`,`Publisher`, `Language`, `ISBN-10`, `ISBN-13`)  '  + 
					 '   VALUES  '  + 
					 '       ("'+item.title+'", "'+item.publisher+'", "'+item.language+'", '+item.ISBN10+', '+item.ISBN13+');  '  + 
					 '   SET @last_id_magazine = LAST_INSERT_ID();  '  + 
					 '   INSERT INTO `Items` (id)  '  + 
					 '   VALUES  '  + 
					 '       (null);  '  + 
					 '   SET @last_id_item = LAST_INSERT_ID();  '  + 
					 '   INSERT INTO `MagazinePh` (idDesc, available, id)  '  + 
					 '   VALUES  '  + 
					 '      (@last_id_magazine, 1, @last_id_item);  ' ; 
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
				completedQuery("Add Magazines");
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
				completedQuery("Delete Magazine");
			})
		})
	}
	modifyItem(item,callback){
		let sql='   UPDATE `MagzineDesc`  '  + 
				'   SET Title="'+item.title+'", Publisher="'+item.publisher+'", Language="'+item.language+'", `ISBN-10`='+item.ISBN10+', `ISBN-13`='+item.ISBN13+'  '  + 
				'  WHERE idDesc='+item.idDesc+';  ';
				console.log(sql);
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
				completedQuery("Modify Magazine");
			})
		})
	}
}
module.exports = MagazinesTDG;

