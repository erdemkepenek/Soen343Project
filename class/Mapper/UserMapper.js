const UserTDG = require("../TDG/UserTDG.js");
const IdentityMap = require("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class UserMapper {
  constructor() {
    this.UserTDG = new UserTDG();
    this.UserUnitOfWork = new UnitOfWork();
    this.UserIdentityMap = new IdentityMap();

  }
  viewUsers(callback) {
	console.log("[UserMapper] viewUsers()");
    let IDM = this.UserIdentityMap;
    var result = IDM.getData();
    if (result.length == 0) {
      this.UserTDG.viewAllUsers(function(msg) {
        IDM.putData(msg);
        callback(msg);
      });
    } else {
      callback(result);
    }
  }
  login(email,password,callback) {
	console.log("[UserMapper] login()");
      this.UserTDG.login(email,password,function(msg) {
        callback(msg);
	  })
  }
  addUser(id, user, callback) {
	console.log("[UserMapper] adduser()"); 
    this.UserUnitOfWork.addNew(id, user);
    
  }
  modifyUser(id, user, callback) {
	console.log("[UserMapper] modifyuser()");
    this.UserUnitOfWork.addDirty(id, user);
    
  }
  deleteUser(id, userId, callback) {
	console.log("[UserMapper] deleteuser()");
    this.UserUnitOfWork.addClean(id, userId);
    
  }
  viewUncommittedWork(id,callback){
	console.log("[UserMapper] viewUncommittedWork()");
	let view = this.UserUnitOfWork.viewUncommittedWork(id);
	callback(view);
  }
  commit(id, callback) {
	console.log("[UserMapper] commit()");
    let users = this.UserUnitOfWork.commit(id);
	let g_msg = {};
	g_msg.creation = [];
	g_msg.modification = [];
	g_msg.deletion = [];
    let add = users.registration;
    for (var i = 0; i < add.length; i++) {
      this.UserTDG.addUser(add[i], function(msg) {
        g_msg.creation.push(msg);
      });
    }
    let updates = users.updates;
    for (var i = 0; i < updates.length; i++) {
      this.UserTDG.modifyUser(updates[i], function(msg) {
        g_msg.modification.push(msg);
      });
    }
    let erase = users.erase;
    for (var i = 0; i < erase.length; i++) {
      this.UserTDG.deleteUser(erase[i], function(msg) {
        g_msg.deletion.push(msg);
      });
    }
    //empty IdentityMap
    let IDM = this.UserIdentityMap;
    IDM.empty();
	//NodeJS Side Effect of asynchronous, wait for request to database is sent 
	this.wait = function(a){
		callback(g_msg);
	}
	setTimeout(this.wait,2000);
  }


}

module.exports = UserMapper;
