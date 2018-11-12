const LogActivityTDG = require("../TDG/LogActivityTDG.js");

class LogActivityMapper {
  constructor() {
    console.log("from LogActivityMapper");
    this.LogActivityTDG = new LogActivityTDG();

  }

  addActivity(id) {
    this.LogActivityTDG.addActivity(id);

  }

  viewActivity() {
    this.LogActivityTDG.viewActivity(function(msg){
      console.log(msg);
    }
    );
  }

}

module.exports = LogActivityMapper;
