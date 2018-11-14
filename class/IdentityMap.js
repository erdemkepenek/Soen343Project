const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');


class IdentityMap {
    constructor() {
        this.Items = new Array();
    }

    putData(item) {
		console.log("[IdentityMap] putData()");
        let temp = item;
        this.Items.push(temp);
		
    }


    getData() {
		console.log("[IdentityMap] getData()");
        return this.Items;
		
    }

    empty() {
		console.log("[IdentityMap] empty()");
        let temp = this.Items;
        temp.splice(0, temp.length);
		
    }

}
module.exports = IdentityMap;