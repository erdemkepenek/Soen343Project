const TDG = require("./TDG.js");
const IdentityMap = require("./IdentityMap.js");
class Mapper {
  constructor() {
    console.log("from Mapper");
    this.myTDG = new TDG();
    this.IDMap = new IdentityMap();
    //this.users = new Array();
  }

  registerUser(email, firstName, lastName, address, phone, isAdmin, password) {
    return this.myTDG.registerUser(
      email,
      firstName,
      lastName,
      address,
      phone,
      isAdmin,
      password
    );
  }
  login(email, pwd, callback) {
	this.myTDG.login(email, pwd,function(data){
		console.log(data);
		callback(data);
	});
  }

  insertItem(type, obj_parameter)
  {
    return this.myTDG.insertItem(type, obj_parameter);
  }

  modifyItem(type, obj_parameter)
  {
    return this.myTDG.modifyItem(type,obj_parameter);
  }

  deleteItem(type, obj_parameter)
  {
    return this.myTDG.deleteItem(type, obj_parameter);
  }

  viewItem(type)
  {
    return this.myTDG.viewItem(type);
  }
  viewUsers() {
	let IDMap_local = this.IDMap;
	let quickUsers = null;
    if (this.IDMap.usersAlreadyFetched()) {
		return this.IDMap.fetchUsers();
    } else {
		let users = this.myTDG.fetchUsers(function (users){
			IDMap_local.addUsers(users);
			quickUsers = users;
			return quickUsers;
		});
		
    }
  }
}
module.exports = Mapper;
