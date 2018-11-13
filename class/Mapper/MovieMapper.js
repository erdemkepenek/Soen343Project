const MovieTDG = require("../TDG/MovieTDG.js");
const IdentityMap = require("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class MovieMapper {
  constructor() {
    console.log("from MovieMapper");
    this.MovieTDG = new MovieTDG();
    this.MovieUnitOfWork = new UnitOfWork();
    this.MovieIdentitymap = new IdentityMap();

  }

  viewItems(callback) {
    let IDM = this.MovieIdentitymap;
    var result = IDM.getData();
    //console.log(result);
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
    this.MovieUnitOfWork.addNew(id, item);
    // this.MovieTDG.addItem(item,function(msg){
    //   callback(msg);
    // });
  }
  modifyItem(id, item, callback) {
    this.MovieUnitOfWork.addDirty(id, item);
    // this.MovieTDG.modifyItem(item, function (msg) {
    //   callback(msg);
    // });
  }
  deleteItem(id, itemId, callback) {
    this.MovieUnitOfWork.addClean(id, itemId);
    // this.MovieTDG.deleteItem(id, function (msg) {
    //   callback(msg);
    // });
  }

  // emptyIDM(id){
  //   let temp = this.MovieIdentitymap;
  //   return temp.empty(id);
  // }

  commit(id, callback) {
    let items = this.MovieUnitOfWork.commit(id);
    console.log("commitss");
    console.log(items);
    //return items;
    let add = items.registration;
    for (var i = 0; i < add.length; i++) {
      this.MovieTDG.addItem(add[i], function(msg) {
        console.log(msg);
      });
    }
    let updates = items.updates;
    for (var i = 0; i < updates.length; i++) {
      this.MovieTDG.modifyItem(updates[i], function(msg) {
        console.log(msg);
      });
    }
    let erase = items.erase;
    for (var i = 0; i < erase.length; i++) {
      this.MovieTDG.deleteItem(erase[i], function(msg) {
        console.log(msg);
      });
    }

    //empty IdentityMap
    let IDM = this.MovieIdentitymap;
    IDM.empty(id);

  }


}

module.exports = MovieMapper;
