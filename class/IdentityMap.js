const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');


class IdentityMap {
    constructor() {
        this.Items = new Array();
    }

    putData(item) {
        let temp = item;
        console.log("Item being added");
        this.Items.push(temp);
    }


    getData() {
        return this.Items;
    }

    empty() {
        let temp = this.Items;
        temp.splice(0, temp.length);
    }

}
module.exports = IdentityMap;