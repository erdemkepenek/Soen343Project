const MusicTDG = require("../TDG/MusicTDG.js");
const IdentityMap = require("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class MusicMapper {
  constructor() {
    console.log("from MusicMapper");
    this.MusicTDG = new MusicTDG();
    this.MusicUnitOfWork = new UnitOfWork();
    this.MusicIdentitymap = new IdentityMap();

  }

  viewItems(callback) {
    let IDM = this.MusicIdentitymap;
    var result = IDM.getData();
    //console.log(result);
    if (result.length == 0) {
      console.log("Getting from database");
      this.MusicTDG.viewItems(function(msg) {
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
    this.MusicUnitOfWork.addNew(id, item);
    // this.MusicTDG.addItem(item,function(msg){
    //   callback(msg);
    // });
  }
  modifyItem(id, item, callback) {
    this.MusicUnitOfWork.addDirty(id, item);
    // this.MusicTDG.modifyItem(item, function (msg) {
    //   callback(msg);
    // });
  }
  deleteItem(id, itemId, callback) {
    this.MusicUnitOfWork.addClean(id, itemId);
    // this.MusicTDG.deleteItem(id, function (msg) {
    //   callback(msg);
    // });
  }

  // emptyIDM(id){
  //   let temp = this.MusicIdentitymap;
  //   return temp.empty(id);
  // }

  commit(id, callback) {
    let items = this.MusicUnitOfWork.commit(id);
    console.log("commitss");
    console.log(items);
    //return items;
    let add = items.registration;
    for (var i = 0; i < add.length; i++) {
      this.MusicTDG.addItem(add[i], function(msg) {
        console.log(msg);
      });
    }
    let updates = items.updates;
    for (var i = 0; i < updates.length; i++) {
      this.MusicTDG.modifyItem(updates[i], function(msg) {
        console.log(msg);
      });
    }
    let erase = items.erase;
    for (var i = 0; i < erase.length; i++) {
      this.MusicTDG.deleteItem(erase[i], function(msg) {
        console.log(msg);
      });
    }

    //empty IdentityMap
    let IDM = this.MusicIdentitymap;
    IDM.empty(id);

  }


}

module.exports = MusicMapper;
