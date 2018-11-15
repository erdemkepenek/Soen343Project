const BookMapper = require("./Mapper/BookMapper.js");
const MusicMapper = require("./Mapper/MusicMapper.js");
const MagazineMapper = require("./Mapper/MagazineMapper.js");
const MovieMapper = require("./Mapper/MovieMapper.js");
const TransactionHistoryMapper = require("./Mapper/TransactionHistoryMapper.js");
const LogActivityMapper = require("./Mapper/LogActivityMapper");

class Controller {
  constructor() {
    this.BookMapper = new BookMapper();
    this.MusicMapper = new MusicMapper();
    this.MagazineMapper = new MagazineMapper();
    this.MovieMapper = new MovieMapper();
    this.TransactionHistory = new TransactionHistoryMapper();
    this.LogActivity = new LogActivityMapper();
  }

  // for BookMapper
  bookAdd(userId, item, confirmation) {
    this.BookMapper.addItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  bookModify(userId, item, confirmation) {
    this.BookMapper.modifyItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  bookDelete(userId, itemId, confirmation) {
    this.BookMapper.deleteItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  bookView(confirmation) {
    this.BookMapper.viewItems();
    confirmation({ status: "true", message: "no message" });
  }

  bookUncommitedWork(userId, confirmation) {
    this.BookMapper.viewUncommittedWork(userId);
    confirmation({ status: "true", message: "no message" });
  }

  bookCommit(userId, confirmation) {
    this.BookMapper.commit(userId, function(g_msg) {
      confirmation(g_msg);
    });
  }

  // for MagazineMapper
  magazineAdd(userId, item, confirmation) {
    this.MagazineMapper.addItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  magazineModify(userId, item, confirmation) {
    this.MagazineMapper.modifyItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  magazineDelete(userId, itemId, confirmation) {
    this.MagazineMapper.deleteItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  magazineView(confirmation) {
    this.MagazineMapper.viewItems();
    confirmation({ status: "true", message: "no message" });
  }

  magazineUncommitedWork(userId, confirmation) {
    this.MagazineMapper.viewUncommittedWork(userId);
    confirmation({ status: "true", message: "no message" });
  }

  magazineCommit(userId, confirmation) {
    this.MagazineMapper.commit(userId, function(g_msg) {
      confirmation(g_msg);
    });
  }

  // for MusicMapper
  musicAdd(userId, item, confirmation) {
    this.MusicMapper.addItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  musicModify(userId, item, confirmation) {
    this.MusicMapper.modifyItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  musicDelete(userId, itemId, confirmation) {
    this.MusicMapper.deleteItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  musicView(confirmation) {
    this.MusicMapper.viewItems();
    confirmation({ status: "true", message: "no message" });
  }

  musicUncommitedWork(userId, confirmation) {
    this.MusicMapper.viewUncommittedWork(userId);
    confirmation({ status: "true", message: "no message" });
  }

  musicCommit(userId, confirmation) {
    this.MusicMapper.commit(userId, function(g_msg) {
      confirmation(g_msg);
    });
  }

  // for MovieMapper
  movieAdd(userId, item, confirmation) {
    this.MovieMapper.addItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  movieModify(userId, item, confirmation) {
    this.MovieMapper.modifyItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  movieDelete(userId, itemId, confirmation) {
    this.MovieMapper.deleteItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  movieView(confirmation) {
    this.MovieMapper.viewItems();
    confirmation({ status: "true", message: "no message" });
  }

  movieUncommitedWork(userId, confirmation) {
    this.MovieMapper.viewUncommittedWork(userId);
    confirmation({ status: "true", message: "no message" });
  }

  movieCommit(userId, confirmation) {
    this.MovieMapper.commit(userId, function(g_msg) {
      confirmation(g_msg);
    });
  }

  // for TransactionHistoryMapper
  transactionHistoryAdd(userId, action, itemId, confirmation) {
    this.TransactionHistory.addActivity(userId, action, itemId, function(msg) {
      confirmation(msg);
    });
  }

  transactionHistoryView(confirmation) {
    this.TransactionHistory.viewActivity(confirmation(msg));
  }

  // for LogActivityMapper
  logActivityMapperAdd(userId, action, confirmation) {
    this.LogActivity.addActivity(userId, action, confirmation(msg));
  }

  logActivityMapperView(confirmation) {
    this.LogActivity.viewActivity(confirmation(msg));
  }
}

module.exports = Controller;
