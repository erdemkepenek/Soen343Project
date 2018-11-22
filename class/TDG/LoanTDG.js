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
    this.runQuery = function (queryBuild) {
      let conn = this.mysqlConnection;
      queryBuild(conn, function (type) {
        console.log("Completed query " + type + " \n");
      });
    };
    // a helper method to get current Date
    this.getCurrentDateWithAddition = function (days) {
      var date = new Date();
      date.setDate(date.getDate() + days);
      var tmp =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      return tmp;
    };
  }


  loanItem(userId, itemDesc, category, callback) {
    let loanDate = this.getCurrentDateWithAddition(0);
    var returnDate;

    if (category == 'magazine') {
      let msg = {success: "false",
        message: "Magazine can not be loaned"};
        callback(msg);
      return;
    }
    else {
      switch (category) {
        case 'book':
          returnDate = this.getCurrentDateWithAddition(7);
          break;
        case 'movie':
          returnDate = this.getCurrentDateWithAddition(2);
          break;
        case 'music':
          returnDate = this.getCurrentDateWithAddition(2);
          break;
      }
    }
    //Used to check if a User has reached his allwed number of items to loan
    let sqlCheck = 'select count(itemId) as loans from Loan  where UserId = ' + userId +' group by UserId';

    //Used to insert an item in the loan table and change the items availability
    let sql =
      "set @item_id = getIDPh(" + itemDesc + ",'" + category + "');" +
      "update `Items` set available = 0 where id = @item_id;" +
      "INSERT INTO `Loan` (`UserId`, `itemId`, `loanDate`, `returnDate`) VALUES (" + userId + ", @item_id, '" + loanDate + "', '" + returnDate + "');"+
    "select @item_id;"
    
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(sql);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    this.runQuery(function (conn, completedQuery) {
      conn.query(sqlCheck, (err, rows, fields) => {
        if (!err) {
			//console.log(rows);
          let msg = {};
          msg.success = "true";
          msg.message = "no message";
          msg.data = rows;
          if (msg.data[0].loans >= 5) {
            msg.message = "Limit reached, you are not allowed to hold more than 5 items";
            console.log('Limit reached');
            callback(msg);
          }
          else 
          {
          //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          conn.query(sql, (err, rows, fields) => {
            if (!err) {
              console.log(rows);
              let msg = {};
              msg.success = "true";
              msg.data = rows;
              callback(msg);
            } else {
              console.log(err);
              let msg = {};
              msg.success = "false";
              msg.message = err.sqlMessage;
              callback(msg);
            }
            completedQuery("[LoanTDG] loanItem()");
          });
          //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        }
        } else {
          console.log(err);
          let msg = {};
          msg.success = "false";
          msg.message = err.sqlMessage;
          callback(msg);
        }
        completedQuery("[LoanTDG] loanItem()");
      });
    });
  }

  returnItem(userId, itemId, callback) {
    let returnDate = this.getCurrentDate;
    let sql =
      "   UPDATE `Items` SET available=1 WHERE id = " +
      itemId +
      ";  " +
      " DELETE from `Loan` where UserId=" + userId + " and itemId=" + itemId
    console.log(sql);
    this.runQuery(function (conn, completedQuery) {
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
        completedQuery("[LoanTDG] returnItem()");
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

    this.runQuery(function (conn, completedQuery) {
      conn.query(sqlBook, (err, rows, fields) => {
        if (!err) {
          msg.success = "true";
          msg.message = "no message";
          msg.data = {};
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
                      msg.data.movies = rows;
                      callback(msg);
                    } else {
                      console.log(err);
                      msg.success = "false";
                      msg.message = err.sqlMessage;
                      callback(msg);
                    }
                    completedQuery("[LoanTDG] viewAllLoans() - 4-4");
                  });
                  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                  msg.data.music = rows;
                  //callback(msg);
                } else {
                  console.log(err);
                  msg.success = "false";
                  msg.message = err.sqlMessage;
                  callback(msg);
                }
                completedQuery("[LoanTDG] viewAllLoans() - 3-4");
              });
              //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
              msg.data.magazines = rows;
              //callback(msg);
            } else {
              console.log(err);
              msg.success = "false";
              msg.message = err.sqlMessage;
              callback(msg);
            }
            completedQuery("[LoanTDG] viewAllLoans() - 2-4");
          });
          //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          msg.data.books = rows;
          //callback(msg);
        } else {
          console.log(err);
          msg.success = "false";
          msg.message = err.sqlMessage;
          callback(msg);
        }
        completedQuery("[LoanTDG] viewAllLoans() - 1-4");
      });
    });
    //end all>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  }

  viewUserLoans(userId, callback) {
    let msg = {}; //array that will keep all the loan data

    //get all the loaned books
    let sqlBook = 'SELECT * FROM BookDesc INNER JOIN(SELECT * FROM BookPh INNER JOIN (SELECT * FROM Loan WHERE UserId = "' + userId + '") AS UserLoans ON BookPh.id = UserLoans.itemId) AS T ON BookDesc.idDesc = T.idDesc';
    let sqlMagazine = 'SELECT * FROM MagazineDesc INNER JOIN(SELECT * FROM MagazinePh INNER JOIN (SELECT * FROM Loan WHERE UserId = "' + userId + '") AS UserLoans ON MagazinePh.id = UserLoans.itemId) AS T ON MagazineDesc.idDesc = T.idDesc';
    let sqlMusic = 'SELECT * FROM MusicDesc INNER JOIN(SELECT * FROM MusicPh INNER JOIN (SELECT * FROM Loan WHERE UserId = "' + userId + '") AS UserLoans ON MusicPh.id = UserLoans.itemId) AS T ON MusicDesc.idDesc = T.idDesc';
    let sqlMovies = 'SELECT * FROM MovieDesc INNER JOIN(SELECT * FROM MoviePh INNER JOIN (SELECT * FROM Loan WHERE UserId = "' + userId + '") AS UserLoans ON MoviePh.id = UserLoans.itemId) AS T ON MovieDesc.idDesc = T.idDesc';

    this.runQuery(function (conn, completedQuery) {
      conn.query(sqlBook, (err, rows, fields) => {
        if (!err) {
          msg.success = "true";
          msg.message = "no message";
          msg.data = {};
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
                      msg.data.movies = rows;
                      callback(msg);
                    } else {
                      console.log(err);
                      msg.success = "false";
                      msg.message = err.sqlMessage;
                      callback(msg);
                    }
                    completedQuery("[LoanTDG] viewAllLoans() - 4-4");
                  });
                  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                  msg.data.music = rows;
                  //callback(msg);
                } else {
                  console.log(err);
                  msg.success = "false";
                  msg.message = err.sqlMessage;
                  callback(msg);
                }
                completedQuery("[LoanTDG] viewAllLoans() - 3-4");
              });
              //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
              msg.data.magazines = rows;
              //callback(msg);
            } else {
              console.log(err);
              msg.success = "false";
              msg.message = err.sqlMessage;
              callback(msg);
            }
            completedQuery("[LoanTDG] viewAllLoans() - 2-4");
          });
          //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          msg.data.books = rows;
          //callback(msg);
        } else {
          console.log(err);
          msg.success = "false";
          msg.message = err.sqlMessage;
          callback(msg);
        }
        completedQuery("[LoanTDG] viewAllLoans() - 1-4");
      });
    });
    //end all>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  }
}
module.exports = LoanTDG;