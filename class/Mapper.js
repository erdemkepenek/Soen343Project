const TDG = require("./TDG.js");
class Mapper {
  constructor() {
    console.log("from Mapper");
    this.myTDG = new TDG();
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

  viewUsers() {}
}
module.exports = Mapper;
