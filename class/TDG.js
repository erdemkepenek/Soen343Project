class TDG {
	constructor(){}
	login (email, password){
		let data;
		if (email=="hello" && password == "bye"){
			data = {status:"success", FirstName:"Jess", LastName:"Gess", message:"Login successful"};
		}
		else{
			data = {status:"unsuccesful", message:"invalid login"};
		}
		return data;
	}
	registerUser(email, firstName, lastName, address, phone, isAdmin, password){
		let register = true
		if(register){
			return true;
		}
		else{
			return false;
		}
	}
	fetchUsers(){
		let users = new Array();
		let user1 = {email:"yet@host.com", firstName:"Bakery", lastName:"Jesser", address:"school", phone:"438-514-1234", isAdmin:true};
		let user2 = {email:"hess@you.com", firstName:"Bread", lastName:"Nemko", address:"neighbor", phone:"1234-438-514", isAdmin:false};
		users.push(user1);
		users.push(user2);
		return users;
	}
}
module.exports = TDG;