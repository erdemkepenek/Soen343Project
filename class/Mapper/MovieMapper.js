const MovieTDG = require("../TDG/MovieTDG.js");
const IdentityMap = require("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class MovieMapper {
  constructor() {
    this.MovieTDG = new MovieTDG();
    this.MovieUnitOfWork = new UnitOfWork();
    this.MovieIdentityMap = new IdentityMap();

  }
  viewItems(callback) {
	console.log("[MovieMapper] viewItems()");
    let IDM = this.MovieIdentityMap;
    var result = IDM.getData();
    if (result.length == 0) {
      console.log("Getting from database");
      this.MovieTDG.viewItems(function(msg) {
        IDM.putData(msg);
        console.log(IDM.getData()[0]);
        callback(msg);
      });
    } else {
      console.log("received from Identity Map");
      callback(result);
    }
  }
  addItem(id, item, callback) {
	console.log("[MovieMapper] addItem()");
    this.MovieUnitOfWork.addNew(id, item);
  }
  modifyItem(id, item, callback) {
	console.log("[MovieMapper] modifyItem()");
    this.MovieUnitOfWork.addDirty(id, item);
  }
  deleteItem(id, itemId, callback) {
	console.log("[MovieMapper] deleteItem()");
    this.MovieUnitOfWork.addClean(id, itemId);
  }
  viewUncommittedWork(id,callback){
	console.log("[MovieMapper] viewUncommittedWork()");
	let view = this.MovieUnitOfWork.viewUncommittedWork(id);
	callback(view);
  }
  commit(id, callback) {
	console.log("[MovieMapper] commit()");
    let items = this.MovieUnitOfWork.commit(id);
	let g_msg = {};
	g_msg.creation = [];
	g_msg.modification = [];
	g_msg.deletion = [];
    let add = items.registration;
    for (var i = 0; i < add.length; i++) {
      this.MovieTDG.addItem(add[i], function(msg) {
        g_msg.creation.push(msg);
      });
    }
    let updates = items.updates;
    for (var i = 0; i < updates.length; i++) {
      this.MovieTDG.modifyItem(updates[i], function(msg) {
        g_msg.modification.push(msg);
      });
    }
    let erase = items.erase;
    for (var i = 0; i < erase.length; i++) {
      this.MovieTDG.deleteItem(erase[i], function(msg) {
        g_msg.deletion.push(msg);
      });
    }
    //empty IdentityMap
    let IDM = this.MovieIdentityMap;
    IDM.empty();
	//NodeJS Side Effect of asynchronous, wait for request to database is sent 
	this.wait = function(a){
		callback(g_msg);
	}
	setTimeout(this.wait,2000);

  }


}

module.exports = MovieMapper;
