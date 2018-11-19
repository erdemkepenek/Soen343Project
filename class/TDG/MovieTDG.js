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
		
		 let sqlCopies = 'select idDesc,id from MoviePh';
		
		 this.runQuery(function(conn,completedQuery){
			conn.query(sql, (err, rows, fields) => {
				if (!err){
					let msg = {};
					msg.success="true";
					msg.message="no message";
					msg.data=rows;
					//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
					conn.query(sqlCopies, (err, rows, fields) => {
						if (!err) {
							let temp = {}
							temp.copies = rows
							for (var j = 0; j < msg.data.length; j++) {
								msg.data[j].copies = new Array();
								for (var i = 0; i < temp.copies.length; i++) {
									if (temp.copies[i].idDesc == msg.data[j].idDesc) {
										msg.data[j].copies.push(temp.copies[i].id);
									}
								}
							}
							callback(msg);
						} else {
							console.log(err);
							msg.success = "false";
							msg.message = err.sqlMessage;
							callback(msg);
						}
					});
					//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
		console.log(item.Title);
		if (item.idDesc == undefined) {
			sql = '   INSERT INTO `MovieDesc` (`Title`, `Director`, `Producers`, `Actors`, `Language`, `Subtitles`, `Dubbed`, `ReleaseDate`,`RunTime`)   ' +
				'   VALUES  ' +
				'       ("'+item.Title+'", "'+item.Director+'", "'+item.Producers+'", "'+item.Actors+'", "'+item.Language+'", "'+item.Subtitles+'", "'+item.Dubbed+'", date "'+item.ReleaseDate+'", "'+item.RunTime+'");   ' +
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
				'   SET Title="'+item.Title+'", Director="'+item.Director+'", Producers="'+item.Producers+'", Actors="'+item.Actors+'", Language="'+item.Language+'", Subtitles = "'+item.Subtitles+'", Dubbed = "'+item.Dubbed+'", ReleaseDate = date "'+ item.ReleaseDate+'", RunTime = "'+item.RunTime+'"'  + 
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




