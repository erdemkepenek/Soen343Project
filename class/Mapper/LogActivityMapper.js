const LogActivityTDG = require("../TDG/LogActivityTDG.js");
const IdentityMap = require("../IdentityMap.js");

class LogActivityMapper {
  constructor() {
    this.LogActivityTDG = new LogActivityTDG();
	this.LogActivityIdentityMap = new IdentityMap();
  }

  addActivity(id,action,callback) {
	let IDM = this.LogActivityIdentityMap;
    this.LogActivityTDG.addActivity(id,action,function(msg){
		callback(msg);
		IDM.empty();
	});
  }

  viewActivity(callback) {
    console.log("[LogActivityMapper] viewActivity()");
    let IDM = this.LogActivityIdentityMap;
    var result = IDM.getData();
    if (result.length == 0) {
      this.LogActivityTDG.viewActivity(function(msg) {
        IDM.putData(msg);
        callback(msg);
      });
    }else {
      callback(result);
    }
  }

}

module.exports = LogActivityMapper;
