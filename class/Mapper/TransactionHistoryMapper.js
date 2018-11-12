const TransactionHistoryTDG = require("../TDG/TransactionHistoryTDG.js");
const IdentityMap = require("../IdentityMap.js");

class TransactionHistoryMapper {
  constructor() {
    console.log("from TransactionHistoryMapper");
    this.TransactionHistoryTDG = new TransactionHistoryTDG();

  }

  addActivity(id, type) {
    this.TransactionHistoryTDG.addActivity(id, type);

  }

  viewActivity() {
    this.TransactionHistoryTDG.viewActivity();
  }

}

module.exports = TransactionHistoryMapper;
