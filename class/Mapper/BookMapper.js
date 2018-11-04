const BookTDG = require("../TDG/BookTDG.js");
//const IdentityMap = require ("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class BookMapper{
  constructor(){
  console.log("from BookMapper");
    this.BookTDG=new BookTDG();
    this.BookUnitOfWork=new UnitOfWork();
    //this.BookIdentitymap= new IdentityMap();
    
  }
  
  viewItems(callback){
      this.BookTDG.viewItems(function(msg){
        callback(msg);
      });
    }
    
  
  addItem(id,item,callback){
    this.BookUnitOfWork.addNew(id,item);
    // this.BookTDG.addItem(item,function(msg){
    //   callback(msg);
    // });
  }
  modifyItem(id,item,callback){
    this.BookUnitOfWork.addDirty(id, item);
    // this.BookTDG.modifyItem(item, function (msg) {
    //   callback(msg);
    // });
  }
  deleteItem(id,itemId, callback) {
    this.BookUnitOfWork.addClean(id, itemId);
    // this.BookTDG.deleteItem(id, function (msg) {
    //   callback(msg);
    // });
  }

  commit(id,callback){
    let items = this.BookUnitOfWork.commit(id);
    console.log("commitss");
    console.log(items);
    //return items;
    let add = items.registration;
    for (var i = 0; i < add.length; i++) {
      this.BookTDG.addItem(add[i], function (msg) {
      console.log(msg);
     });
    }
    let updates = items.updates;
    for (var i = 0; i < updates.length; i++) {
      this.BookTDG.modifyItem(updates[i], function (msg) {
        console.log(msg);
      });
    }
    let erase = items.erase;
    for (var i = 0; i < erase.length; i++) {
      this.BookTDG.deleteItem(erase[i], function (msg) {
        console.log(msg);
      });
    }
  }


}

module.exports = BookMapper;