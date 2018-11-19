const BookTDG = require("../TDG/BookTDG.js");
const IdentityMap = require("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class BookMapper {
  constructor() {
    this.BookTDG = new BookTDG();
    this.BookUnitOfWork = new UnitOfWork();
    this.BookIdentityMap = new IdentityMap();

  }

  viewItems(callback) {
	console.log("[BookMapper] viewItems()");
    let IDM = this.BookIdentityMap;
	let result = IDM.getData();
    if (result.length == 0) {
      this.BookTDG.viewItems(function(msg) {
        IDM.putData(msg);
        callback(msg);
      });
    } else {
      callback(result[0]);
    }
  }
  emptyIdentityMap(){
	this.BookIdentityMap.empty();
  }
  addItem(id, item, callback) {
	console.log("[BookMapper] addItem()"); 
    this.BookUnitOfWork.addNew(id, item);
    
  }
  removeNewItem(id, index_){
	console.log("[BookMapper] removeNewItem()"); 
    this.BookUnitOfWork.removeNew(id, index_);
  }
  modifyItem(id, item, callback) {
	console.log("[BookMapper] modifyItem()");
    this.BookUnitOfWork.addDirty(id, item);
  }
  removeModifyItem(id, index_){
	console.log("[BookMapper] removeModifyItem()"); 
    this.BookUnitOfWork.removeDirty(id, index_);
  }
  deleteItem(id, itemId, callback) {
	console.log("[BookMapper] deleteItem()");
    this.BookUnitOfWork.addClean(id, itemId);
  }
  removeDeleteItem(id, index_){
	console.log("[BookMapper] removeDeleteItem()"); 
    this.BookUnitOfWork.removeClean(id, index_);
  }
  viewUncommittedWork(id,callback){
	console.log("[BookMapper] viewUncommittedWork()");
	let view = this.BookUnitOfWork.viewUncommittedWork(id);
	callback(view);
  }
  commit(id, callback) {
	console.log("[BookMapper] commit()");
    let items = this.BookUnitOfWork.commit(id);
    console.log(items)
	let g_msg = {};
	g_msg.creation = [];
	g_msg.modification = [];
	g_msg.deletion = [];
    let add = items.registration;
    for (var i = 0; i < add.length; i++) {
      this.BookTDG.addItem(add[i], function(msg) {
        g_msg.creation.push(msg);
      });
    }
    let updates = items.updates;
    for (var i = 0; i < updates.length; i++) {
      this.BookTDG.modifyItem(updates[i], function(msg) {
        g_msg.modification.push(msg);
      });
    }
    let erase = items.erase;
    for (var i = 0; i < erase.length; i++) {
      this.BookTDG.deleteItem(erase[i], function(msg) {
        g_msg.deletion.push(msg);
      });
    }
    //empty IdentityMap
    let IDM = this.BookIdentityMap;
    IDM.empty();
	//NodeJS Side Effect of asynchronous, wait for request to database is sent 
	this.wait = function(a){
		callback(g_msg);
	}
	setTimeout(this.wait,2000);
  }


}

module.exports = BookMapper;
