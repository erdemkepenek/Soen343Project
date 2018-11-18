const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

class MovieTDG {

    constructor()
    {
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
        let sql = 'SELECT MovieDesc.idDesc, Title,Director,Producers ,Actors, Language, Subtitles,'+
         'Dubbed,ReleaseDate,RunTime ,COUNT(CASE WHEN available THEN 1 END)as available, COUNT(id) as Quantity FROM MovieDesc '+
         'LEFT JOIN MoviePh ON MoviePh.idDesc = MovieDesc.idDesc GROUP BY (MovieDesc.idDesc)' ; 
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
				completedQuery("[MovieTDG] viewItems");
			})
		})
    }
    


	addItem(item, callback) {
		let sql;
		console.log(item.title);
		if (item.idDesc == undefined) {
			sql = '   INSERT INTO `MovieDesc` (`Title`, `Director`, `Producers`, `Actors`, `Language`, `Subtitles`, `Dubbed`, `ReleaseDate`,`RunTime`)   ' +
				'   VALUES  ' +
				'       ("'+item.title+'", "'+item.director+'", "'+item.producers+'", "'+item.actors+'", "'+item.language+'", "'+item.subtitles+'", "'+item.dubbed+'", date "'+item.releaseDate+'", "'+item.runTime+'");   ' +
				'   SET @last_id_movie = LAST_INSERT_ID();  ' +
				'   INSERT INTO `Items` (id)  ' +
				'   VALUES  ' +
				'       (null);  ' +
				'   SET @last_id_item = LAST_INSERT_ID();  ' +
				'   INSERT INTO `MoviePh` (idDesc, available, id)  ' +
				'   VALUES  ' +
				'      (@last_id_movie, 1, @last_id_item);  ';
		}
		else {
			sql = '   INSERT INTO `Items` (id)  ' +
				'   VALUES  ' +
				'       (null);  ' +
				'   SET @last_id_item = LAST_INSERT_ID();  ' +
				'   INSERT INTO `MoviePh` (idDesc, available, id)  ' +
				'   VALUES  ' +
				'      (' + item.idDesc + ', 1, @last_id_item);   ';
		}
		console.log(sql);
		this.runQuery(function (conn, completedQuery) {
			conn.query(sql, (err, rows, fields) => {
				if (!err) {
					let msg = {};
					msg.success = "true";
					msg.message = "no message";
					msg.data = rows;
					callback(msg);
				}
				else {
					console.log(err);
					let msg = {};
					msg.success = "false";
					msg.message = err.sqlMessage;;
					callback(msg);
				}
				completedQuery("[MovieTDG] addItem()");
			})
		})
	}

	deleteItem(item, callback) {
		let sql;
		if (item.idDesc == undefined) {
			sql = '  DELETE FROM `Items` where id = ' + item.itemId + ';  ';
		}
		else {
			sql = 'DELETE ' +
				'FROM Items ' +
				'where Items.id ' +
				'in ' +
				'(SELECT id FROM MoviePh ' +
				'WHERE idDesc = ' + item.idDesc + '); ' +
				'Delete from MovieDesc where idDesc = ' + item.idDesc + ';'
		}

		this.runQuery(function (conn, completedQuery) {
			conn.query(sql, (err, rows, fields) => {
				if (!err) {
					let msg = {};
					msg.success = "true";
					msg.message = "no message";
					msg.data = rows;
					callback(msg);
				}
				else {
					console.log(err);
					let msg = {};
					msg.success = "false";
					msg.message = err.sqlMessage;;
					callback(msg);
				}
				completedQuery("[MovieTDG] deleteItem()");
			})
		})
	}
    
    modifyItem(item,callback){
		let sql='   UPDATE `MovieDesc`  '  + 
				'   SET Title="'+item.title+'", Director="'+item.director+'", Producers="'+item.producers+'", Actors="'+item.actors+'", Language="'+item.language+'", Subtitles = "'+item.subtitles+'", Dubbed = "'+item.dubbed+'", ReleaseDate = date "'+ item.releaseDate+'", RunTime = "'+item.runTime+'"'  + 
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
				completedQuery("[MovieTDG] modifyItem()");
			})
		})
	}
    
    
    
    }

    module.exports = MovieTDG




