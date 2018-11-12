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
    // a helper method to get current Date
    this.getCurrentDate = function() {
      var date = new Date();
      var tmp =
        date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
      return tmp;
    };
  }

  /*
		+ loanItem():
    + returnItem():
    + viewItems():
	*/
  loanItem(userId, itemId, callback) {
    let loanDate = this.getCurrentDate;
    let sql =
      "   UPDATE `Items`  " +
      "   SET available=0 WHERE itemId =" +
      itemId +
      ";  " +
      "INSERT INTO `Loan` (`UserId`, `itemId`, `loanDate`) VALUES (" +
      userId +
      "," +
      itemId +
      ",'" +
      loanDate +
      "');";
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
    let returnDate = this.getCurrentDate;
    let sql =
      "   UPDATE `Items` SET available=1 WHERE itemId = " +
      itemId +
      ";  " +
      " UPDATE `Loan` SET returnDate = '" +
      returnDate +
      "' WHERE UserId = " +
      userId +
      " AND itemId = " +
      itemId +
      " AND returnDate is NULL;";
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

  viewAllLoans(callback) {
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
        completedQuery("View All Loan Records");
      });
    });
  }

  viewLoansForOneUser(userId, callback) {
    let sql = "SELECT * FROM Loan WHERE UserId = " + userId + ";"; // for now just display information only in Loan table
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
        completedQuery("View Loan Records for a User");
      });
    });
  }
}
module.exports = LoanTDG;
