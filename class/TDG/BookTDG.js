const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

class BookTDG {
	//constructor is used to create a connection to the database
	constructor() {
		this.mysqlConnection = mysql.createPool({
			host: '192.185.72.57',
			user: 'arti17co_soen343',
			password: 'hy.$EA)MS4_.',
			database: 'arti17co_soen343',
			multipleStatements: true,
		});
		this.runQuery = function (queryBuild) {
			let conn = this.mysqlConnection;
			queryBuild(conn, function (type) {
				console.log("Completed query " + type + " \n");
			});
		};
	}
	viewItems(callback) {

		let sql = 'SELECT BookDesc.idDesc, Title,Author,Format, Pages, Publisher, `ISBN-10`,`ISBN-13`, Language,  COUNT(CASE WHEN available THEN 1 END)as available, COUNT(id) as Quantity FROM BookDesc LEFT JOIN BookPh ON BookPh.idDesc = BookDesc.idDesc GROUP BY (BookDesc.idDesc)';
		let sqlCopies = 'select idDesc,id from BookPh';

		this.runQuery(function (conn, completedQuery) {
			conn.query(sql, (err, rows, fields) => {
				if (!err) {
					let msg = {};
					msg.success = "true";
					msg.message = "no message";
					msg.data = rows;
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
					//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
				}
				else {
					console.log(err);
					let msg = {};
					msg.success = "false";
					msg.message = err.sqlMessage;;
					callback(msg);
				}
				completedQuery("[BookTDG] viewBooks()");
			})
		})
	}
	addItem(item, callback) {
		let sql;
		console.log(item.title);
		if (item.idDesc == undefined) {
			sql = '   INSERT INTO `BookDesc` (`Title`, `Author`, `Format`, `Pages`, `Publisher`, `ISBN-10`, `ISBN-13`, `Language`)  ' +
				'   VALUES  ' +
				'       ("' + item.title + '", "' + item.author + '", "' + item.format + '", ' + item.pages + ', "' + item.publisher + '", ' + item.ISBN10 + ', ' + item.ISBN13 + ', "' + item.language + '");  ' +
				'   SET @last_id_book = LAST_INSERT_ID();  ' +
				'   INSERT INTO `Items` (id)  ' +
				'   VALUES  ' +
				'       (null);  ' +
				'   SET @last_id_item = LAST_INSERT_ID();  ' +
				'   INSERT INTO `BookPh` (idDesc, available, id)  ' +
				'   VALUES  ' +
				'      (@last_id_book, 1, @last_id_item);  ';
		}
		else {
			sql = '   INSERT INTO `Items` (id)  ' +
				'   VALUES  ' +
				'       (null);  ' +
				'   SET @last_id_item = LAST_INSERT_ID();  ' +
				'   INSERT INTO `BookPh` (idDesc, available, id)  ' +
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
				completedQuery("[BookTDG] addItem()");
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
				'(SELECT id FROM BookPh ' +
				'WHERE idDesc = ' + item.idDesc + '); ' +
				'Delete from BookDesc where idDesc = ' + item.idDesc + ';'
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
				completedQuery("[BookTDG] deleteItem()");
			})
		})
	}
	modifyItem(item, callback) {
		let sql = '   UPDATE `BookDesc`  ' +
			'   SET Title="' + item.title + '", Author="' + item.author + '", Format="' + item.format + '", Pages=' + item.pages + ', Publisher="' + item.publisher + '", `ISBN-10`=' + item.ISBN10 + ', `ISBN-13`=' + item.ISBN13 + ', Language="' + item.language + '"  ' +
			'  WHERE idDesc=' + item.idDesc + ';  ';
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
				completedQuery("[BookTDG] modifyItem()");
			})
		})
	}
}
module.exports = BookTDG;

