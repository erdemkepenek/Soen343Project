const BookTDG = require("../TDG/BookTDG.js");
//const IdentityMap = require ("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class BookMapper{
  constructor(){
  console.log("from BookMapper");
    this.BookTDG=new BookTDG();
    //this.BookIdentitymap= new IdentityMap();
    //this.UnitOfWork=new UnitOfWork();
  }
  
  viewItems(callback){
      this.BookTDG.viewItems(function(msg){
        callback(msg);
      });
    }
    
  
  addItem(item,callback){
    this.BookTDG.addItem(item,function(msg){
      callback(msg);
    });
  }
  modifyItem(item, callback){
    this.BookTDG.modifyItem(item, function (msg) {
      callback(msg);
    });
  }
  deleteItem(id, callback) {
    this.BookTDG.deleteItem(id, function (msg) {
      callback(msg);
    });
  }
}

module.exports = BookMapper;