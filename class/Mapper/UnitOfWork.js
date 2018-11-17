const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");

class UnitOfWork {
  constructor() {
    this.registration = new Array();
    this.updates = new Array();
    this.erase = new Array();
    this.getUserIndex = function(id, arr) {
      let temp = arr;
      for (var i = 0; i < temp.length; i++) {
        if (temp[i][0] == id) {
          return i;
        }
      }
      return -1;
    };
  }
  addNew(id, item) {
    console.log("[UnitOfWork] addNew()");
    let index = this.getUserIndex(id, this.registration);
    if (index > -1) {
      this.registration[index][1].push(item);
      //console.log(this.registration[index][1]);
    } else {
      let temp = [id, [item]];
      this.registration.push(temp);
    }
  }
  removeNew(id, index_) {
    console.log("[UnitOfWork] removeNew()");
    let index = this.getUserIndex(id, this.registration);
    if (index > -1 && index_ < this.registration[index][1].length) {
      this.registration[index][1].splice(index_, 1);
      //console.log(this.registration[index][1]);
    }
  }
  addDirty(id, item) {
    console.log("[UnitOfWork] addDirty()");
    let index = this.getUserIndex(id, this.updates);
    if (index > -1) {
      this.updates[index][1].push(item);
    } else {
      let temp = [id, [item]];
      this.updates.push(temp);
    }
  }
  removeDirty(id, index_) {
    console.log("[UnitOfWork] removeDirty()");
    let index = this.getUserIndex(id, this.updates);
    if (index > -1 && index_ < this.updates[index][1].length) {
      this.updates[index][1].splice(index_, 1);
      //console.log(this.updates[index][1]);
    }
  }
  addClean(id, itemId) {
    console.log("[UnitOfWork] addClean()");
    let index = this.getUserIndex(id, this.erase);
    if (index > -1) {
      this.erase[index][1].push(itemId);
    } else {
      let temp = [id, [itemId]];
      this.erase.push(temp);
    }
  }
  removeClean(id, index_) {
    console.log("[UnitOfWork] removeClean()");
    let index = this.getUserIndex(id, this.erase);
    if (index > -1 && index_ < this.erase[index][1].length) {
      this.erase[index][1].splice(index_, 1);
      //console.log(this.erase[index][1]);
    }
  }
  viewUncommittedWork(id) {
    console.log("[UnitOfWork] viewUncommittedWork()");
    let temp = {};
    temp.id = id;
    let index_reg = this.getUserIndex(id, this.registration);
    if (index_reg > -1) {
      temp.registration = this.registration[index_reg][1];
    } else {
      temp.registration = [];
    }
    let index_upt = this.getUserIndex(id, this.updates);
    if (index_upt > -1) {
      temp.updates = this.updates[index_upt][1];
    } else {
      temp.updates = [];
    }
    let index_clean = this.getUserIndex(id, this.erase);
    if (index_clean > -1) {
      temp.erase = this.erase[index_clean][1];
    } else {
      temp.erase = [];
    }
    return temp;
  }
  commit(id) {
    console.log("[UnitOfWork] commit()");
    let temp = {};
    temp.id = id;
    let index_reg = this.getUserIndex(id, this.registration);
    if (index_reg > -1) {
      temp.registration = this.registration[index_reg][1];
      this.registration.splice(index_reg, 1);
    } else {
      temp.registration = [];
    }
    let index_upt = this.getUserIndex(id, this.updates);
    if (index_upt > -1) {
      temp.updates = this.updates[index_upt][1];
      this.updates.splice(index_upt, 1);
    } else {
      temp.updates = [];
    }
    let index_clean = this.getUserIndex(id, this.erase);
    if (index_clean > -1) {
      temp.erase = this.erase[index_clean][1];
      this.erase.splice(index_clean, 1);
    } else {
      temp.erase = [];
    }
    return temp;
  }
}
module.exports = UnitOfWork;
