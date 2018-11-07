const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');


class IdentityMap
{

    constructor()
    {

		/*
		this.registration = [
								[3, [ { idDesc: 28, title: 'successEG', author: 'Shakespear', format: 'hardcopy', pages: 342, publisher: 'Concordia', ISBN10: null, ISBN13: null, language: 'english' } ] ]
							]
		*/
        this.Items = new Array();
        this.getUserIndex = function (id, arr) {
            //console.log(id+"aaa");
            let temp = arr;
            for (var i = 0; i < temp.length; i++) {
				/*
				console.log("aa");
				console.log(temp[i]);
				console.log("bb");
				*/
                if (temp[i][0] == id) {
                    //console.log("ID "+i);
                    return i;
                }
            }
            return -1;
        };
    }
    


    addItem(id, item){
        console.log("Add New Item");
        let index = this.getUserIndex(id, this.Items);
        console.log("Index of User: " + index);
        if (index > -1) {
            console.log("Item being added");
            this.Items[index][1].push(item)
            //console.log(this.Items[index][1]);
        }
        else {
            let temp = [id, [item]];
            console.log("User and item being added");
            this.Items.push(temp);
           // console.log(this.Items);
        }
    }


	getItems(id){
        let temp = {};
        temp.id = id;
        let index_reg = this.getUserIndex(id, this.Items);
        if (index_reg > -1) {
            temp.Items = this.Items[index_reg][1];
        }
        else {
            temp.Items = [];
        }
        return temp;
	}
   
    empty(id){
        let index_clean = this.getUserIndex(id, this.Items);
		if(index_clean>-1){
            this.Items.splice(index_clean,1);
            console.log("success deleted bravoooo");
            return "Success, deleted !";
		}
		else {
            console.log("User not found damnnnnnnn");
			return "User not found.";
		}
    }
    
    

}
module.exports = IdentityMap;