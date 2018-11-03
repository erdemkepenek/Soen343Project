const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

class UnitOfWork{
	constructor(){
		/*
		this.registration = [
								[3, [ { idDesc: 28, title: 'successEG', author: 'Shakespear', format: 'hardcopy', pages: 342, publisher: 'Concordia', ISBN10: null, ISBN13: null, language: 'english' } ] ]
							]
		*/
		this.registration = new Array();
		this.updates = new Array();
		this.erase = new Array();
		this.getUserIndex = function(id,arr){
			//console.log(id+"aaa");
			let temp = arr;
			for(var i= 0; i<temp.length;i++){
				/*
				console.log("aa");
				console.log(temp[i]);
				console.log("bb");
				*/
				if(temp[i][0]==id){
					//console.log("ID "+i);
					return i;
				}
			}
			return -1;
		};
	}
	addNew(id,item){
		console.log("Add New Item");
		let index = this.getUserIndex(id, this.registration);
		console.log("Index of User: "+index);
		if(index>-1){
			console.log("Item being added");
			this.registration[index][1].push(item)
			console.log(this.registration[index][1]);
		}
		else{
			let temp = [id,[item]];
			console.log("User and item being added");
			this.registration.push(temp);
			console.log(this.registration);
		}
	}
	addDirty(id,item){
		console.log("Add New Update");
		let index = this.getUserIndex(id, this.updates);
		console.log("Index of User: "+index);
		if(index>-1){
			console.log("Item being added");
			this.updates[index][1].push(item)
			console.log(this.updates[index][1]);
		}
		else{
			let temp = [id,[item]];
			console.log("User and item being added");
			this.updates.push(temp);
			console.log(this.updates);
		}
	}
	addClean(id,itemId){
		console.log("Add New Delete");
		let index = this.getUserIndex(id, this.erase);
		console.log("Index of User: "+index);
		if(index>-1){
			console.log("Item being added");
			this.erase[index][1].push(itemId)
			console.log(this.erase[index][1]);
		}
		else{
			let temp = [id,[itemId]];
			console.log("User and item being added");
			this.erase.push(temp);
			console.log(this.erase);
		}
	}
	commit(id){
		let temp = {};
		temp.id=id;
		let index_reg = this.getUserIndex(id, this.registration);
		if(index_reg>-1){
			temp.registration = this.registration[index_reg][1];
			this.registration.splice(index_reg,1);
		}
		let index_upt = this.getUserIndex(id, this.updates);
		if(index_upt>-1){
			temp.updates = this.updates[index_upt][1];
			this.updates.splice(index_upt,1);
		}
		let index_clean = this.getUserIndex(id, this.erase);
		if(index_clean>-1){
			temp.erase = this.erase[index_clean][1];
			this.erase.splice(index_clean,1);
		}
		console.log(this.registration);
		console.log(this.updates);
		console.log(this.erase);
		
		
		return temp;
	}
}
module.exports = UnitOfWork;