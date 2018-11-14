const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

class MusicTDG {
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
		let sql = 'SELECT MusicDesc.idDesc, Title, Artist , Label, Type, ReleaseDate, ASIN, COUNT(id) as Quantity FROM MusicDesc LEFT JOIN MusicPh ON MusicPh.idDesc = MusicDesc.idDesc GROUP BY (MusicDesc.idDesc)' ; 
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
				completedQuery("[MusicTDG] viewItems()");
			})
		})
	}
	addItem(item, callback){
		let sql=	 '   INSERT INTO `MusicDesc` (`Title`, `Artist`, `Label`, `Type`, `ReleaseDate`, `ASIN`)  '  + 
					 '   VALUES  '  + 
					 '       ("'+item.title+'", "'+item.artist+'", "'+item.label+'", "'+item.type+'", date "'+item.releaseDate+'", '+item.ASIN+');  '  + 
					 '   SET @last_id_music = LAST_INSERT_ID();  '  + 
					 '   INSERT INTO `Items` (id)  '  + 
					 '   VALUES  '  + 
					 '       (null);  '  + 
					 '   SET @last_id_item = LAST_INSERT_ID();  '  + 
					 '   INSERT INTO `MusicPh` (idDesc, available, id)  '  + 
					 '   VALUES  '  + 
					 '      (@last_id_music, 1, @last_id_item);  ' ; 
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
				completedQuery("[MovieTDG] addItem()");
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
				completedQuery("[MusicTDG] deleteItem()");
			})
		})
	}
	modifyItem(item,callback){
		let sql='   UPDATE `MusicDesc`  '  + 
				'   SET Title="'+item.title+'", Artist="'+item.artist+'", Label="'+item.label+'", Type="'+item.type+'", ReleaseDate= date "'+item.releaseDate+'", `ASIN`='+item.ASIN+''+ 
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
				completedQuery("[MusicTDG] modifyItem()");
			})
		})
	}
}
module.exports = MusicTDG;

