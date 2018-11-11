const MagazineTDG = require("../TDG/MagazineTDG.js");
const IdentityMap = require("../IdentityMap.js");
const UnitOfWork = require("../UnitOfWork.js");

class MagazineMapper {
  constructor() {
    console.log("from MagazineMapper");
    this.MagazineTDG = new MagazineTDG();
    this.MagazineUnitOfWork = new UnitOfWork();
    this.MagazineIdentitymap = new IdentityMap();

  }

  viewItems(callback) {
    let IDM = this.MagazineIdentitymap;
    var result = IDM.getData();
    //console.log(result);
    if (result.length == 0) {
      console.log("Getting from database");
      this.MagazineTDG.viewItems(function(msg) {
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
    this.MagazineUnitOfWork.addNew(id, item);
    // this.MagazineTDG.addItem(item,function(msg){
    //   callback(msg);
    // });
  }
  modifyItem(id, item, callback) {
    this.MagazineUnitOfWork.addDirty(id, item);
    // this.MagazineTDG.modifyItem(item, function (msg) {
    //   callback(msg);
    // });
  }
  deleteItem(id, itemId, callback) {
    this.MagazineUnitOfWork.addClean(id, itemId);
    // this.MagazineTDG.deleteItem(id, function (msg) {
    //   callback(msg);
    // });
  }

  // emptyIDM(id){
  //   let temp = this.MagazineIdentitymap;
  //   return temp.empty(id);
  // }

  commit(id, callback) {
    let items = this.MagazineUnitOfWork.commit(id);
    console.log("commitss");
    console.log(items);
    //return items;
    let add = items.registration;
    for (var i = 0; i < add.length; i++) {
      this.MagazineTDG.addItem(add[i], function(msg) {
        console.log(msg);
      });
    }
    let updates = items.updates;
    for (var i = 0; i < updates.length; i++) {
      this.MagazineTDG.modifyItem(updates[i], function(msg) {
        console.log(msg);
      });
    }
    let erase = items.erase;
    for (var i = 0; i < erase.length; i++) {
      this.MagazineTDG.deleteItem(erase[i], function(msg) {
        console.log(msg);
      });
    }

    //empty IdentityMap
    let IDM = this.MagazineIdentitymap;
    IDM.empty(id);

  }


}

module.exports = MagazineMapper;
