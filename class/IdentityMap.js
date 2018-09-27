class IdentityMap {

	constructor(){
		this.users = new Array();
	}

	usersAlreadyFetched(){
		if (this.users.length == 0)
			return false
		else return true;
	}

	fetchUsers() {
		return this.users;
	}
 
	addUsers(users) {
		for (let i=0; i<users.length; i++) {
			this.users.push(users[i]);
		}
	}
}
module.exports = IdentityMap;