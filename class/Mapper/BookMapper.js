const BookTDG = require("../TDG/BookTDG.js");
const IdentityMap = require ("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class BookMapper{
  constructor(){
  console.log("from BookMapper");
    this.BookTDG=new BookTDG();
    this.BookUnitOfWork=new UnitOfWork();
    this.BookIdentitymap= new IdentityMap();
    
  }
  
  viewItems(id,callback){
      let temp = this.BookIdentitymap;
      var result = temp.getItems(id);
      //console.log(result);
      if (result.Items.length == 0 ){
        console.log("Getting from database");
        this.BookTDG.viewItems(function(msg){
          temp.addItem(id,msg);
          //console.log((temp.getItems(id)));
          callback(msg);
        });
      }
      else{ 
        console.log("received from Identity Map");
        callback(result);
      }
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

  // emptyIDM(id){
  //   let temp = this.BookIdentitymap;
  //   return temp.empty(id);
  // }

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

    //empty IdentityMap
    let IDM = this.BookIdentitymap;
    IDM.empty(id);

  }


}

module.exports = BookMapper;