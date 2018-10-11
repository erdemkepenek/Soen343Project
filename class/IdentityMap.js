class IdentityMap {

	constructor(){
		this.users = new Array();
		this.items = new Array();
	}

	usersAlreadyFetched(){
		if (this.users.length == 0)
			return false
		else return true;
	}


// checks if a specific user is already fetched
	userAlreadyFetched(user){
		for (let i=0; i<users.length; i++) {
			if (users[i]==user) {return true;}
		}
		return false;
	}
// checks if a specific item is already fetched
	itemAlreadyFetched(item){
		for (let i=0; i<items.length; i++) {
			if (items[i]==item) {return true;}
		}
		return false;
	}

	fetchUsers() {
		return this.users;
	}
 
// fetch all items
	 fetchItems() {
		return this.items;
	}

	addUsers(users) {
		for (let i=0; i<users.length; i++) {
			this.users.push(users[i]);
		}
	}

// add items
	addItems(items) {
		for (let i=0; i<items.length; i++) {
			this.items.push(items[i]);
		}
	}
}
module.exports = IdentityMap;