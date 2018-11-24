const TransactionHistoryTDG = require("../TDG/TransactionHistoryTDG.js");
const IdentityMap = require("../IdentityMap.js");


class TransactionHistoryMapper {
  constructor() {
    this.TransactionHistoryTDG = new TransactionHistoryTDG();
    this.TransactionHistoryIdentityMap = new IdentityMap();
  }

  addActivity(id, action, itemId, callback) {
    console.log("[TransactionHistoryTDG] addActivity()");
    let IDM = this.TransactionHistoryIdentityMap;
    this.TransactionHistoryTDG.addActivity(id, action, itemId, function(msg) {
      callback(msg);
      IDM.empty();
    });
  }

  viewActivity(callback) {
    console.log("[TransactionHistoryTDG] viewActivity()");
    let IDM = this.TransactionHistoryIdentityMap;
    var result = IDM.getData();
    if (result.length == 0) {
      this.TransactionHistoryTDG.viewActivity(function(msg) {
        IDM.putData(msg);
        callback(msg);
      });
    } else {
      callback(result[0]);
    }
  }
}

module.exports = TransactionHistoryMapper;
