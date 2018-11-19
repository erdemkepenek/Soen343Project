const BookMapper = require("./Mapper/BookMapper.js");
const MusicMapper = require("./Mapper/MusicMapper.js");
const MagazineMapper = require("./Mapper/MagazineMapper.js");
const MovieMapper = require("./Mapper/MovieMapper.js");
const TransactionHistoryMapper = require("./Mapper/TransactionHistoryMapper.js");
const LogActivityMapper = require("./Mapper/LogActivityMapper");
const UserMapper = require("./Mapper/UserMapper");
const LoanMapper = require("./Mapper/LoanMapper");

class Controller {
  constructor() {
    this.BookMapper = new BookMapper();
    this.MusicMapper = new MusicMapper();
    this.MagazineMapper = new MagazineMapper();
    this.MovieMapper = new MovieMapper();
    this.TransactionHistory = new TransactionHistoryMapper();
    this.LogActivity = new LogActivityMapper();
    this.UserMapper = new UserMapper();
	this.LoanMapper = new LoanMapper();
  }

  // for BookMapper
  bookAdd(userId, item, confirmation) {
	console.log("[Controller] bookAdd()");
    this.BookMapper.addItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }
  bookAddCopy(userId, item, quantity, confirmation) {
	console.log("[Controller] bookAddCopy()");
	while(quantity-->0){
		this.BookMapper.addItem(userId, item);
	}
    confirmation({ status: "true", message: "no message" });
  }
  bookRemoveAdd(userId, index_, confirmation) {
	console.log("[Controller] bookRemoveAdd()");
    this.BookMapper.removeNewItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  bookModify(userId, item, confirmation) {
    console.log("[Controller] bookModify()");	  
    this.BookMapper.modifyItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }
  bookRemoveModify(userId, index_, confirmation) {
	console.log("[Controller] bookRemoveModify()");
    this.BookMapper.removeModifyItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  bookDelete(userId, itemId, confirmation) {
	console.log("[Controller] bookDelete()");
    this.BookMapper.deleteItem(userId, itemId);
    confirmation({ status: "true", message: "no message" });
  }
  bookRemoveDelete(userId, index_, confirmation) {
	console.log("[Controller] bookRemoveDelete()");
    this.BookMapper.removeDeleteItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  bookView(confirmation) {
	console.log("[Controller] bookView()");
    this.BookMapper.viewItems(function(msg){
      confirmation(msg);
    })
  }
  bookUncommitedWork(userId, confirmation) {
	console.log("[Controller] bookUncommitedWork()");
    this.BookMapper.viewUncommittedWork(userId,function(msg){
      confirmation(msg);
    }); 
  }
  bookCommit(userId, confirmation) {
	console.log("[Controller] bookCommit()");
    this.BookMapper.commit(userId, function(g_msg) {
      confirmation(g_msg);
    });
  }
  // for MagazineMapper
  magazineAdd(userId, item, confirmation) {
	console.log("[Controller] magazineAdd()");
    this.MagazineMapper.addItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }
  magazineAddCopy(userId, item, quantity, confirmation) {
	console.log("[Controller] magazineAddCopy()");
	while(quantity-->0){
		this.MagazineMapper.addItem(userId, item);
	}
    confirmation({ status: "true", message: "no message" });
  }
  magazineRemoveAdd(userId, index_, confirmation) {
	console.log("[Controller] magazineRemoveAdd()");
    this.MagazineMapper.removeNewItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  magazineModify(userId, item, confirmation) {
	console.log("[Controller] magazineModify()");
    this.MagazineMapper.modifyItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }
  magazineRemoveModify(userId, index_, confirmation) {
	console.log("[Controller] magazineRemoveModify()");
    this.MagazineMapper.removeModifyItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  magazineDelete(userId, itemId, confirmation) {
	console.log("[Controller] magazineDelete()");
    this.MagazineMapper.deleteItem(userId, itemId);
    confirmation({ status: "true", message: "no message" });
  }
  magazineRemoveDelete(userId, index_, confirmation) {
	console.log("[Controller] magazineRemoveDelete()");
    this.MagazineMapper.removeDeleteItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  magazineView(confirmation) {
	console.log("[Controller] magazineView()");
    this.MagazineMapper.viewItems(function (msg) {
      confirmation(msg);
    })
  }
  magazineUncommitedWork(userId, confirmation) {
	console.log("[Controller] magazineUncommitedWork()");
    this.MagazineMapper.viewUncommittedWork(userId, function (msg) {
      confirmation(msg);
    });
  }

  magazineCommit(userId, confirmation) {
	console.log("[Controller] magazineCommit()");
    this.MagazineMapper.commit(userId, function (g_msg) {
      confirmation(g_msg);
    });
  }
  // for MusicMapper
  musicAdd(userId, item, confirmation) {
	console.log("[Controller] musicAdd()");
    this.MusicMapper.addItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }
  musicAddCopy(userId, item, quantity, confirmation) {
	console.log("[Controller] musicAddCopy()");
	while(quantity-->0){
		this.MusicMapper.addItem(userId, item);
	}
    confirmation({ status: "true", message: "no message" });
  }
  musicRemoveAdd(userId, index_, confirmation) {
	console.log("[Controller] musicRemoveAdd()");
    this.MusicMapper.removeNewItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  musicModify(userId, item, confirmation) {
	console.log("[Controller] musicModify()");
    this.MusicMapper.modifyItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }
  musicRemoveModify(userId, item, confirmation) {
	console.log("[Controller] musicRemoveDelete()");
    this.MusicMapper.removeModifyItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }
  musicDelete(userId, itemId, confirmation) {
	console.log("[Controller] musicDelete()");
    this.MusicMapper.deleteItem(userId, itemId);
    confirmation({ status: "true", message: "no message" });
  }
  musicRemoveDelete(userId, index_, confirmation) {
	console.log("[Controller] musicRemoveDelete()");
    this.MusicMapper.removeDeleteItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  musicView(confirmation) {
	console.log("[Controller] musicView()");
    this.MusicMapper.viewItems(function (msg) {
      confirmation(msg);
    })
  }
  musicUncommitedWork(userId, confirmation) {
	console.log("[Controller] musicUncommitedWork()");
    this.MusicMapper.viewUncommittedWork(userId, function (msg) {
      confirmation(msg);
    });
  }
  musicCommit(userId, confirmation) {
	console.log("[Controller] musicCommit()");
    this.MusicMapper.commit(userId, function (g_msg) {
      confirmation(g_msg);
    });
  }

  // for MovieMapper
  movieAdd(userId, item, confirmation) {
	console.log("[Controller] movieAdd()");
    this.MovieMapper.addItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }
  movieAddCopy(userId, item, quantity, confirmation) {
	console.log("[Controller] movieAddCopy()");
	while(quantity-->0){
		this.MovieMapper.addItem(userId, item);
	}
    confirmation({ status: "true", message: "no message" });
  }
  movieRemoveAdd(userId, index_, confirmation) {
	console.log("[Controller] movieRemoveAdd()");
    this.MovieMapper.removeNewItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  movieModify(userId, item, confirmation) {
	console.log("[Controller] movieModify()");
    this.MovieMapper.modifyItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }
  movieRemoveModify(userId, index_, confirmation) {
	console.log("[Controller] movieRemoveModify()");
    this.MovieMapper.removeModifyItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  movieDelete(userId, itemId, confirmation) {
	console.log("[Controller] movieDelete()");
    this.MovieMapper.deleteItem(userId, itemId);
    confirmation({ status: "true", message: "no message" });
  }
  movieRemoveDelete(userId, index_, confirmation) {
	console.log("[Controller] movieRemoveDelete()");
    this.MovieMapper.removeDeleteItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  movieView(confirmation) {
	console.log("[Controller] movieView()");
    this.MovieMapper.viewItems(function (msg) {
      confirmation(msg);
    })
  }
  movieUncommitedWork(userId, confirmation) {
	console.log("[Controller] movieUncommitedWork()");
    this.MovieMapper.viewUncommittedWork(userId, function (msg) {
      confirmation(msg);
    });

  }
  movieCommit(userId, confirmation) {
	console.log("[Controller] movieCommit()");
    this.MovieMapper.commit(userId, function (g_msg) {
      confirmation(g_msg);
    });
  }

  // for TransactionHistoryMapper
  transactionHistoryAdd(userId, action, itemId, confirmation) {
	console.log("[Controller] transactionHistoryAdd()");
    this.TransactionHistory.addActivity(userId, action, itemId, function(msg) {
      confirmation(msg);
    });
  }
  transactionHistoryView(confirmation) {
	console.log("[Controller] transactionHistoryView()");
    this.TransactionHistory.viewActivity(function(msg){
		confirmation(msg);
	});
  }

  // for LogActivityMapper
  logActivityMapperAdd(userId, action, confirmation) {
	console.log("[Controller] logActivityMapperAdd()");  
    this.LogActivity.addActivity(userId, action, function(msg){
		confirmation(msg)
	});
  }
  
  logActivityMapperView(confirmation) {
	console.log("[Controller] logActivityMapperView()");  
    this.LogActivity.viewActivity(function(msg){
		confirmation(msg);
	});
  }
   // for UserMapper
  userLogin(email,password,confirmation){
	  console.log("[Controller] userLogin()");  
	  this.UserMapper.login(email, password,function(msg){
		  confirmation(msg);
	  });
  }
  userAdd(userId, user, confirmation) {
	console.log("[Controller] userAdd()");  
    this.UserMapper.addUser(userId, user);
    confirmation({ status: "true", message: "no message" });
  }
  userRemoveAdd(userId, index_, confirmation) {
	console.log("[Controller] userRemoveAdd()");
    this.UserMapper.removeNewUser(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  userModify(userId, user, confirmation) {
	console.log("[Controller] userModify()");
    this.UserMapper.modifyUser(userId, user);
    confirmation({ status: "true", message: "no message" });
  }
  userRemoveModify(userId, index_, confirmation) {
	console.log("[Controller] userRemoveModify()");
    this.UserMapper.removeModifyUser(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  userDelete(userId, userId_del, confirmation) {
	console.log("[Controller] userDelete()");
    this.UserMapper.deleteUser(userId, userId_del);
    confirmation({ status: "true", message: "no message" });
  }
  userRemoveDelete(userId, index_, confirmation) {
	console.log("[Controller] userRemoveDelete()");
    this.UserMapper.removeDeleteUser(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  userView(confirmation) {
	console.log("[Controller] userView()");
    this.UserMapper.viewUsers(function(msg){
		confirmation(msg);
	});
    
  }
  userUncommitedWork(userId, confirmation) {
	console.log("[Controller] userUncommitedWork()");
    this.UserMapper.viewUncommittedWork(userId,function(msg){
		confirmation(msg);
	});
  }
  userCommit(userId, confirmation) {
	console.log("[Controller] userCommit()");
    this.UserMapper.commit(userId, function(g_msg) {
      confirmation(g_msg);
    });
  }
  //for LoanMapper
  loanViewAll(confirmation) {
	console.log("[Controller] loanViewAll()");
    this.LoanMapper.viewAllLoans(function(msg){
      confirmation(msg)
    });
  }

  loanViewUser(userId,confirmation) {
	console.log("[Controller] loanViewUser()");
    this.LoanMapper.viewUserLoans(userId,function (msg) {
      confirmation(msg)
    });
  }

  loanAddItem(userId, itemId, confirmation){
	console.log("[Controller] loanAddItem()");
	this.LoanMapper.addLoanItem(userId,itemId); 
	confirmation({ status: "true", message: "no message" });
  }
  loanRemoveAdd(userId, index_, confirmation) {
	console.log("[Controller] loanRemoveAdd()");
    this.LoanMapper.removeLoanItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  loanAddReturn(userId, itemId, confirmation){
	console.log("[Controller] loanAddReturn()");
	this.LoanMapper.addReturnItem(userId,itemId); 
	confirmation({ status: "true", message: "no message" });
  }
  loanRemoveReturn(userId, index_, confirmation) {
	console.log("[Controller] loanRemoveReturn()");
    this.BookMapper.removeReturnItem(userId, index_);
    confirmation({ status: "true", message: "no message" });
  }
  loanUncommitedWork(userId,confirmation){
	  console.log("[Controller] loanUncommitedWork()");
	  this.LoanMapper.viewUncommittedWork(userId, function(msg){
		  confirmation(msg);
	  })
  }
  loanCommit(userId,confirmation){
	let temp = this.TransactionHistory;
	console.log("[Controller] loanCommit()");
	this.LoanMapper.commit(userId, function(msg, items){
		//console.log(items);
		//console.log(msg);
		let loanedItems = items.registration; 
		for(var i = 0;i<loanedItems.length;i++){
			if(msg.loaned[i].success=="true"){
				temp.addActivity(items.id,"loan",msg.loaned[i].data[3][0]["@item_id"],function(msg){
					//if confirmation for transaction needed;
				});
			}
		}
		for(var i = 0;i<msg.returned.length;i++){
			console.log("OKOK");
			if(msg.returned[i].success=="true"){
				temp.addActivity(items.id,"return",msg.returned[i].itemId,function(msg){
					//if confirmation for transaction needed;
				});
			}
		}
		confirmation(msg);
	})
  }
}

module.exports = Controller;
