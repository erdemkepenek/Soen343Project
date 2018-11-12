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
    let msg = {}; //array that will keep all the loan data
    
    //get all the loaned books
    let sqlBook = 'SELECT * FROM BookDesc INNER JOIN (SELECT * FROM BookPh INNER JOIN Loan ON BookPh.id = Loan.itemId) AS T ON BookDesc.idDesc = T.idDesc';
    let sqlMagazine = 'SELECT * FROM MagazineDesc INNER JOIN (SELECT * FROM MagazinePh INNER JOIN Loan ON MagazinePh.id = Loan.itemId) AS T ON MagazineDesc.idDesc = T.idDesc'; 
    let sqlMusic = 'SELECT * FROM MusicDesc INNER JOIN (SELECT * FROM MusicPh INNER JOIN Loan ON MusicPh.id = Loan.itemId) AS T ON MusicDesc.idDesc = T.idDesc';
    let sqlMovies = 'SELECT * FROM MovieDesc INNER JOIN (SELECT * FROM MoviePh INNER JOIN Loan ON MoviePh.id = Loan.itemId) AS T ON MovieDesc.idDesc = T.idDesc';

    this.runQuery(function(conn, completedQuery) {
      conn.query(sqlBook, (err, rows, fields) => {
        if (!err) {
          msg.success = "true";
          msg.message = "no message";
          //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          conn.query(sqlMagazine, (err, rows, fields) => {
            if (!err) {
              msg.success = "true";
              msg.message = "no message";
                  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                                  conn.query(sqlMusic, (err, rows, fields) => {
                                    if (!err) {
                                      msg.success = "true";
                                      msg.message = "no message";
                                      //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                                                      conn.query(sqlMovies, (err, rows, fields) => {
                                                        if (!err) {
                                                          msg.success = "true";
                                                          msg.message = "no message";
                                                          msg.movies = rows;
                                                          callback(msg);
                                                        } else {
                                                          console.log(err);
                                                          msg.success = "false";
                                                          msg.message = err.sqlMessage;
                                                          callback(msg);
                                                        }
                                                        completedQuery("View All Loan Records");
                                                      });  
                                      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                                      msg.music = rows;
                                      //callback(msg);
                                    } else {
                                      console.log(err);
                                      msg.success = "false";
                                      msg.message = err.sqlMessage;
                                      callback(msg);
                                    }
                                    completedQuery("View All Loan Records");
                                  });
                  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
              msg.magazines = rows;
              //callback(msg);
            } else {
              console.log(err);
              msg.success = "false";
              msg.message = err.sqlMessage;
              callback(msg);
            }
            completedQuery("View All Loan Records");
          });
          //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          msg.books = rows;
          //callback(msg);
        } else {
          console.log(err);
          msg.success = "false";
          msg.message = err.sqlMessage;
          callback(msg);
        }
        completedQuery("View All Loan Records");
      });
    });
    //end all>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    //get all the loaned Magazines   
    // this.runQuery(function (conn, completedQuery) {
    //   conn.query(sqlMagazine, (err, rows, fields) => {
    //     if (!err) {
    //       msg.success = "true";
    //       msg.message = "no message";
    //       msg.magazines = rows;
    //       //callback(msg);
    //     } else {
    //       console.log(err);
    //       msg.success = "false";
    //       msg.message = err.sqlMessage;
    //       callback(msg);
    //     }
    //     completedQuery("View All Loan Records");
    //   });
    // });
    //end get magazines

    //get all the loaned Music
    
    // this.runQuery(function (conn, completedQuery) {
    //   conn.query(sqlMusic, (err, rows, fields) => {
    //     if (!err) {
    //       msg.success = "true";
    //       msg.message = "no message";
    //       msg.music = rows;
    //       //callback(msg);
    //     } else {
    //       console.log(err);
    //       msg.success = "false";
    //       msg.message = err.sqlMessage;
    //       callback(msg);
    //     }
    //     completedQuery("View All Loan Records");
    //   });
    // });
    //end get Music

    //get all the loaned Movies
    
    // this.runQuery(function (conn, completedQuery) {
    //   conn.query(sqlMovies, (err, rows, fields) => {
    //     if (!err) {
    //       msg.success = "true";
    //       msg.message = "no message";
    //       msg.movies = rows;
    //       //callback(msg);
    //     } else {
    //       console.log(err);
    //       msg.success = "false";
    //       msg.message = err.sqlMessage;
    //       callback(msg);
    //     }
    //     completedQuery("View All Loan Records");
    //   });
    // });
    //end get Movies

    //callback(msg);
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
