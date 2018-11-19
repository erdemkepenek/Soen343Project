const LoanTDG = require("../TDG/LoanTDG.js");
const IdentityMap = require("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class LoanMapper {
  constructor() {
    this.LoanTDG = new LoanTDG();
    this.LoanUnitOfWork = new UnitOfWork();
    this.LoanIdentitymap = new IdentityMap();
  }
  viewAllLoans(callback) {
    console.log("[LoanMapper] viewAllLoans()");
    let IDM = this.LoanIdentitymap;
    var result = IDM.getData();
    //console.log(result);
    if (result.length == 0) {
      this.LoanTDG.viewAllLoans(function (msg) {
        IDM.putData(msg);
        callback(msg.data);
      });
    } else {
      callback(result[0].data);
    }
  }
  emptyIdentityMap(){
	this.LoanIdentitymap.empty();
  }
  //The below method helps to view loans of one specific user
  viewUserLoans(userId, callback) {
    console.log("[LoanMapper] viewUserLoans");
    let IDM = this.LoanIdentitymap;
    this.LoanTDG.viewUserLoans(userId, function (msg) {
        IDM.putData(msg);
        callback(msg.data);
    });
  }
  addLoanItem(userId, item, callback) {
    console.log("[LoanMapper] addLoantItem()");
    this.LoanUnitOfWork.addNew(userId, item);
  }
  removeLoanItem(id, index_) {
    console.log("[UserMapper] removeReturnItem()");
    this.LoanUnitOfWork.removeNew(id, index_);
  }

  addReturnItem(userId, item, callback) {
    console.log("[LoanMapper] addReturnItem()");
    this.LoanUnitOfWork.addDirty(userId, item);
  }
  removeReturnItem(id, index_) {
    console.log("[UserMapper] removeReturnItem()");
    this.BookUnitOfWork.removeDirty(id, index_);
  }
  viewUncommittedWork(id, callback) {
    console.log("[LoanMapper] viewUncommittedWork()");
    let view = this.LoanUnitOfWork.viewUncommittedWork(id);
    callback(view);
  }


  commit(userId, callback) {
    console.log("[LoanMapper] commit()");
    let items = this.LoanUnitOfWork.commit(userId);
    console.log("commitss");
    console.log(items);
    let g_msg = {};
    g_msg.loaned = [];
    g_msg.returned = [];
    let add = items.registration;
    for (var i = 0; i < add.length; i++) {
      this.LoanTDG.loanItem(userId, add[i].idDesc, add[i].category, function (msg) {
        g_msg.loaned.push(msg);
      });
    }
    let updates = items.updates;
    for (var i = 0; i < updates.length; i++) {
	  let item_id = updates[i].itemId;
      this.LoanTDG.returnItem(userId, updates[i].itemId, function (msg) {
		msg.itemId=item_id;
        g_msg.returned.push(msg);
      });
    }

    //empty IdentityMap
    let IDM = this.LoanIdentitymap;
    IDM.empty(userId);

    //NodeJS Side Effect of asynchronous, wait for request to database is sent 
    this.wait = function (a) {
      callback(g_msg, items);
    }
    setTimeout(this.wait, 2000);

  }
}

module.exports = LoanMapper;
