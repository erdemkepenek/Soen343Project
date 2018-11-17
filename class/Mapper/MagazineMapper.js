const MagazineTDG = require("../TDG/MagazineTDG.js");
const IdentityMap = require("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class MagazineMapper {
  constructor() {
    this.MagazineTDG = new MagazineTDG();
    this.MagazineUnitOfWork = new UnitOfWork();
    this.MagazineIdentityMap = new IdentityMap();

  }
  viewItems(callback) {
	console.log("[MagazineMapper] viewItems()");
    let IDM = this.MagazineIdentityMap;
    var result = IDM.getData();
    if (result.length == 0) {
      this.MagazineTDG.viewItems(function(msg) {
        IDM.putData(msg);
        callback(msg);
      });
    } else {
      callback(result[0]);
    }
  }
  addItem(id, item, callback) {
	console.log("[MagazineMapper] addItem()");
    this.MagazineUnitOfWork.addNew(id, item);
  }
  removeNewItem(id, index_){
	console.log("[MagazineMapper] removeNewItem()"); 
    this.BookUnitOfWork.removeNew(id, index_);
  }
  modifyItem(id, item, callback) {
	console.log("[MagazineMapper] modifyItem()");
    this.MagazineUnitOfWork.addDirty(id, item);
  }
  deleteItem(id, itemId, callback) {
	console.log("[MagazineMapper] deleteItem()");
    this.MagazineUnitOfWork.addClean(id, itemId);
  }
  viewUncommittedWork(id,callback){
	console.log("[MagazineMapper] viewUncommittedWork()");
	let view = this.MagazineUnitOfWork.viewUncommittedWork(id);
	callback(view);
  }
  commit(id, callback) {
    console.log("[MagazineMapper] commit()");
    let items = this.MagazineUnitOfWork.commit(id);
	let g_msg = {};
	g_msg.creation = [];
	g_msg.modification = [];
	g_msg.deletion = [];
    let add = items.registration;
    for (var i = 0; i < add.length; i++) {
      this.MagazineTDG.addItem(add[i], function(msg) {
        g_msg.creation.push(msg);
      });
    }
    let updates = items.updates;
    for (var i = 0; i < updates.length; i++) {
      this.MagazineTDG.modifyItem(updates[i], function(msg) {
        g_msg.modification.push(msg);
      });
    }
    let erase = items.erase;
    for (var i = 0; i < erase.length; i++) {
      this.MagazineTDG.deleteItem(erase[i], function(msg) {
        g_msg.deletion.push(msg);
      });
    }
    //empty IdentityMap
    let IDM = this.MagazineIdentityMap;
    IDM.empty();
	//NodeJS Side Effect of asynchronous, wait for request to database is sent 
	this.wait = function(a){
		callback(g_msg);
	}
	setTimeout(this.wait,2000);

  }


}

module.exports = MagazineMapper;
