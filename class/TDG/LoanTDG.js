const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");

class LoanTDG {
  //constructor is used to create a connection to the database
  constructor() {
    this.mysqlConnection = mysql.createPool({
      host: "192.185.72.57",
      user: "arti17co_soen343",
      password: "hy.$EA)MS4_.",
      database: "arti17co_soen343",
      multipleStatements: true
    });
    this.runQuery = function(queryBuild) {
      let conn = this.mysqlConnection;
      queryBuild(conn, function(type) {
        console.log("Completed query " + type + " \n");
      });
    };
  }
  /*
		+ loanItem():
    + returnItem():
    + viewItems():
	*/
  loanItem(userId, itemId, callback) {
    let sql =
      "   UPDATE `Items`  " +
      "   SET available=0 WHERE id =" +
      itemId +
      ";  " +
      "INSERT INTO `Loan` (`UserId`, `itemId`, `rentTime`) VALUES (" +
      userId +
      "," +
      itemId +
      ",'24:00');"; // the default length of a loan is 24 hours (temporary)
    console.log(sql);
    this.runQuery(function(conn, completedQuery) {
      conn.query(sql, (err, rows, fields) => {
        if (!err) {
          let msg = {};
          msg.success = "true";
          msg.message = "no message";
          msg.data = rows;
          callback(msg);
        } else {
          console.log(err);
          let msg = {};
          msg.success = "false";
          msg.message = err.sqlMessage;
          callback(msg);
        }
        completedQuery("Loan an item");
      });
    });
  }

  returnItem(userId, itemId, callback) {
    "   UPDATE `Items`  " + "   SET available=1 WHERE id =" + itemId + ";  "; // userId is not used for now
    console.log(sql);
    this.runQuery(function(conn, completedQuery) {
      conn.query(sql, (err, rows, fields) => {
        if (!err) {
          let msg = {};
          msg.success = "true";
          msg.message = "no message";
          msg.data = rows;
          callback(msg);
        } else {
          console.log(err);
          let msg = {};
          msg.success = "false";
          msg.message = err.sqlMessage;
          callback(msg);
        }
        completedQuery("Return an item");
      });
    });
  }

  viewItems(callback) {
    let sql = "SELECT * FROM Loan"; // for now just display information only in Loan table
    this.runQuery(function(conn, completedQuery) {
      conn.query(sql, (err, rows, fields) => {
        if (!err) {
          let msg = {};
          msg.success = "true";
          msg.message = "no message";
          msg.data = rows;
          callback(msg);
        } else {
          console.log(err);
          let msg = {};
          msg.success = "false";
          msg.message = err.sqlMessage;
          callback(msg);
        }
        completedQuery("View Loan Records");
      });
    });
  }
}
module.exports = LoanTDG;
