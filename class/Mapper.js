const TDG = require("./TDG.js");
const IdentityMap = require("./IdentityMap.js");
class Mapper {
  constructor() {
    console.log("from Mapper");
    this.myTDG = new TDG();
    this.IDMap = new IdentityMap();
    // this.users = new Array();
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
  login(email, pwd) {
    return this.myTDG.login(email, pwd);
  }
  viewUsers() {
    if (this.IDMap.usersAlreadyFetched()) {
		return this.IDMap.fetchUsers();
    } else {
		let users = this.myTDG.fetchUsers();
		this.IDMap.addUsers(users);
		return users;
    }
  }
}
module.exports = Mapper;
