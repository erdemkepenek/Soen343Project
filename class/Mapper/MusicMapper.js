const MusicTDG = require("../TDG/MusicTDG.js");
const IdentityMap = require("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class MusicMapper {
  constructor() {
    this.MusicTDG = new MusicTDG();
    this.MusicUnitOfWork = new UnitOfWork();
    this.MusicIdentityMap = new IdentityMap();
  }

  viewItems(callback) {
	console.log("[MusicMapper] viewItems()");
    let IDM = this.MusicIdentityMap;
    var result = IDM.getData();
    if (result.length == 0) {
      this.MusicTDG.viewItems(function(msg) {
        IDM.putData(msg);
        callback(msg);
      });
    } else {
      callback(result);
    }
  }
  addItem(id, item, callback) {
	console.log("[MusicMapper] addItem()");
    this.MusicUnitOfWork.addNew(id, item);
  }
  modifyItem(id, item, callback) {
	console.log("[MusicMapper] modifyItem()");
    this.MusicUnitOfWork.addDirty(id, item);
  }
  deleteItem(id, itemId, callback) {
	console.log("[MusicMapper] deleteItem()");
    this.MusicUnitOfWork.addClean(id, itemId);
  }
  viewUncommittedWork(id,callback){
	console.log("[MusicMapper] viewUncommittedWork()");
	let view = this.MusicUnitOfWork.viewUncommittedWork(id);
	callback(view);
  }
  commit(id, callback) {
	console.log("[MusicMapper] commit()");
    let items = this.MusicUnitOfWork.commit(id);
	let g_msg = {};
	g_msg.creation = [];
	g_msg.modification = [];
	g_msg.deletion = [];
    let add = items.registration;
    for (var i = 0; i < add.length; i++) {
      this.MusicTDG.addItem(add[i], function(msg) {
        g_msg.creation.push(msg);
      });
    }
    let updates = items.updates;
    for (var i = 0; i < updates.length; i++) {
      this.MusicTDG.modifyItem(updates[i], function(msg) {
        g_msg.modification.push(msg);
      });
    }
    let erase = items.erase;
    for (var i = 0; i < erase.length; i++) {
      this.MusicTDG.deleteItem(erase[i], function(msg) {
        g_msg.deletion.push(msg);
      });
    }
    //empty IdentityMap
    let IDM = this.MusicIdentityMap;
    IDM.empty();
	//NodeJS Side Effect of asynchronous, wait for request to database is sent 
	this.wait = function(a){
		callback(g_msg);
	}
	setTimeout(this.wait,2000);

  }


}

module.exports = MusicMapper;
