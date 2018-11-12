const LoanTDG = require("../TDG/LoanTDG.js");
const IdentityMap = require("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class LoanMapper {
  constructor() {
    console.log("from LoanMapper");
    this.LoanTDG = new LoanTDG();
    this.LoanUnitOfWork = new UnitOfWork();
    this.LoanIdentitymap = new IdentityMap();
  }

  viewLoans(callback) {
    let IDM = this.LoanIdentitymap;
    var result = IDM.getData();
    //console.log(result);
    if (result.length == 0) {
      console.log("Getting from database");
      this.LoanTDG.viewAllLoans(function(msg) {
        IDM.putData(msg);
        console.log(IDM.getData()[0]);
        callback(msg);
      });
    } else {
      console.log("received from Identity Map");
      callback(result);
    }
  }

  viewLoan(userId, callback) {
    let IDM = this.LoanIdentitymap;
    var result = IDM.getData();
    //console.log(result);
    if (result.length == 0) {
      console.log("Getting from database");
      this.LoanTDG.viewLoansForOneUser(userId, function(msg) {
        IDM.putData(msg);
        console.log(IDM.getData()[0]);
        callback(msg);
      });
    } else {
      console.log("received from Identity Map");
      callback(result);
    }
  }

  addLoanItem(userId, itemId, callback) {
    this.LoanUnitOfWork.addNew(userId, itemId);
  }

  addReturnItem(userId, itemId, callback) {
    this.LoanUnitOfWork.addDirty(userId, itemId);
  }

  commit(userId, callback) {
    let items = this.LoanUnitOfWork.commit(userId);
    console.log("commitss");
    console.log(items);
    //return items;
    let add = items.registration;
    for (var i = 0; i < add.length; i++) {
      this.LoanTDG.loanItem(userId, add[i], function(msg) {
        console.log(msg);
      });
    }
    let updates = items.updates;
    for (var i = 0; i < updates.length; i++) {
      this.LoanTDG.returnItem(userId, updates[i], function(msg) {
        console.log(msg);
      });
    }

    //empty IdentityMap
    let IDM = this.LoanIdentitymap;
    IDM.empty(userId);
  }
}

module.exports = LoanMapper;
