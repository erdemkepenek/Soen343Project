const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const encrypt = require("js-sha512");
const mysql = require("mysql");
const BookMapper = require("./class/Mapper/BookMapper.js");
const MagazineMapper = require("./class/Mapper/MagazineMapper.js");
const MagazineTDG = require("./class/TDG/MagazineTDG.js");
const TransactionHistoryMapper = require("./class/Mapper/TransactionHistoryMapper.js");
const LogActivityMapper = require("./class/Mapper/LogActivityMapper.js");
const userTDG = require("./class/TDG/UserTDG.js");
const logActivityTDG = require("./class/TDG/logActivityTDG.js");
const transactionHistoryTDG = require("./class/TDG/transactionHistoryTDG.js");
const LoanTDG = require("./class/TDG/LoanTDG.js");
const itemTDG_ = require("./class/Mapper/LogActivityMapper.js");
const itemTDG = require("./class/Controller.js");
const Controller = require("./class/Controller.js");
let item = {
  "idDesc": 29,
  "title": "successEG",
  "author": "Shakespear",
  "format": "hardcopy",
  "pages": 342,
  "publisher": "Concordia",
  "ISBN10": null,
  "ISBN13": null,
  "language": "english"
}
/*
let myWork = new UnitOfWork();
myWork.addNew(4,item);
myWork.addDirty(4,item);
myWork.addDirty(4,item);
myWork.addDirty(3,item);
myWork.addClean(4,35);
myWork.addClean(4,44);
let temp5 = myWork.commit(4);
console.log(temp5);

*/
let item2 = {
  "id": 46,
  "idDesc": 26,
  "title": "samsung",
  "author": "Shakespear",
  "format": "hardcopy",
  "pages": 342,
  "publisher": "Concordia",
  "ISBN10": null,
  "ISBN13": null,
  "language": "english"
}
let item3 = {
  "idDesc": 26,
  "title": "apple",
  "publisher": "Concordia",
  "ISBN10": 738299,
  "ISBN13": 383838,
  "language": "english"
}

let user2 = {
  FirstName: 'TEST',
  LastName: 'TEST',
  Address: 'SOMEWHERE',
  email: 'TT@T.COM',
  phone: 2147483647,
  type: 0,
  password: 'helloWorld',
  UserId: 879
}

let item_book = {
  "idDesc": 36,
  "title": "TEST4",
  "author": "Concordia",
  "format": "hardcopy",
  "pages": 342,
  "publisher": "Concordia",
  "ISBN10": null,
  "ISBN13": null,
  "language": "english"
}
let item_book_mod = {
  "idDesc": 41,
  "title": "AAAA",
  "author": "Concordia",
  "format": "hardcopy",
  "pages": 342,
  "publisher": "Concordia",
  "ISBN10": null,
  "ISBN13": null,
  "language": "english"
}

let item_book_mod2 = {
  "idDesc": 41,
  "title": "BBBB",
  "author": "Concordia",
  "format": "hardcopy",
  "pages": 342,
  "publisher": "Concordia",
  "ISBN10": null,
  "ISBN13": null,
  "language": "english"
}

let item_movie = {
	idDesc:14,
	title: "DD",
	director: "BB",
	producers: "CC",
	actors: "AA",
	language: "AA",
	subtitles: "AA",
	dubbed: "AA",
	releaseDate: "2017-04-20",
	runTime: "120"
	
}
let item_movie_1 = {
	idDesc:14,
	title: "DD",
	director: "BB",
	producers: "CC",
	actors: "AA",
	language: "AA",
	subtitles: "AA",
	dubbed: "AA",
	releaseDate: "2017-04-21",
	runTime: "120"
	
}
let item_movie_2 = {
	idDesc:14,
	title: "DD",
	director: "BB",
	producers: "CC",
	actors: "AA",
	language: "AA",
	subtitles: "AA",
	dubbed: "AA",
	releaseDate: "2017-05-20",
	runTime: "120"
	
}

let item_movie_mod = {
	idDesc:14,
	title: "EEAA",
	director: "BB",
	producers: "CC",
	actors: "AA",
	language: "AA",
	subtitles: "AA",
	dubbed: "AA",
	releaseDate: "2017-04-20",
	runTime: "120"
	
}

let item_music = {
	idDesc:4,
	title: "DD",
	artist: "BB",
	label: "CC",
	type: "AA",
	releaseDate: "2020-12-14",
	ASIN: 0123126729
}

let item_music_1 = {
	idDesc:4,
	title: "DD",
	artist: "BB",
	label: "CC",
	type: "AA",
	releaseDate: "2020-12-14",
	ASIN: 01621426729
}
let item_music_2 = {
	idDesc:4,
	title: "DD",
	artist: "BB",
	label: "CC",
	type: "AA",
	releaseDate: "2020-12-14",
	ASIN: 11124266729
}

let item_music_mod = {
	idDesc:4,
	title: "EEII",
	artist: "BB",
	label: "CC",
	type: "AA",
	releaseDate: "2020-12-14",
	ASIN: 0126326729
}

let item_magazine = {
	idDesc:20,
	title: "EE",
	publisher: "GG",
	language: "CC",
	ISBN10: "982-0392-84469-209",
	ISBN13: "124412-1232163"
}
let item_magazine_1 = {
	idDesc:20,
	title: "EE",
	publisher: "GG",
	language: "CC",
	ISBN10: "44982-032392-189-209",
	ISBN13: "121442-1211233"
}
let item_magazine_2 = {
	idDesc:20,
	title: "EE",
	publisher: "GG",
	language: "CC",
	ISBN10: "94482-0392342-89-209",
	ISBN13: "124412-1422313"
}
let item_magazine_mod = {
	idDesc:18,
	title: "EEUUPP",
	publisher: "GG",
	language: "CC",
	ISBN10: "94482-03942-8239-209",
	ISBN13: "144212-1421323"
}

let user = {
  FirstName: 'TEST',
  LastName: 'TEST',
  Address: 'SOMEWHERE',
  email: 'AAAA@AAA.COM',
  phone: 2147483647,
  type: 0,
  password: 'helloWorld',
}
let user_1 = {
  FirstName: 'TEST',
  LastName: 'TEST',
  Address: 'SOMEWHERE',
  email: 'BBBB@BBB.COM',
  phone: 2147483647,
  type: 0,
  password: 'helloWorld',
}
let user_2 = {
  UserId:883,	
  FirstName: 'TEST_66',
  LastName: 'TEST',
  Address: 'SOMEWHERE',
  email: 'CCCC@CCC.COM',
  phone: 2147483647,
  type: 1,
  password: 'helloWorld',
}
let user___mod = {
  UserId:880,	
  FirstName: 'TEST_AAAA',
  LastName: 'TEST',
  Address: 'SOMEWHERE',
  email: 'TEST@45.COM',
  phone: 2147483647,
  type: 1,
  password: 'helloWorld',
}

"'+item.title+'", "'+item.publisher+'", "'+item.language+'", '+item.ISBN10+', '+item.ISBN13+'
// kk.bookView(function(msg){
	// console.log(msg);
// })
let user_add = {
  UserId: 881,
  FirstName: 'TEST',
  LastName: 'TEST',
  Address: 'SOMEWHERE',
  email: 'TEST@1111.COM',
  phone: 2147483647,
  password: "helloWorld",
  type: 0
}
let user_mod = {
  UserId: 770,
  FirstName: 'CHANGED',
  LastName: 'TEST',
  Address: 'SOMEWHERE',
  email: 'TEST@11111.COM',
  phone: 2147483647,
  password:"helloWorld",
  type: 0
}
kk = new Controller();
kk.catalogView(function(msg){
	console.log(msg);
})

// kk.userLogin("TEST@9.COM","helloWorld",function(msg){
	// console.log(msg);
// })




//myBookMapper = new BookMapper();
/*
myBookMapper=new BookMapper();
>>>>>>> Stashed changes
//myBookMapper.viewItems(function(msg){
//console.log(msg);
//});
<<<<<<< Updated upstream

//myTDGMAG = new MagazineTDG();
//myTDGMAG.addItem(item3);
// myMagazineMapper = new MagazineMapper();
// myMagazineMapper.addItem(3, item3)
// myMagazineMapper.commit(3);
// myTransactions = new TransactionHistoryMapper();
// myTransactions.addActivity(3, 'loan');
// myLogActivity = new LogActivityMapper();
// myLogActivity.addActivity(3);
// myLogActivity.viewActivity();
// kk.viewUsers(function(msg){
	// console.log(msg);
// })

// kk.login("TEST@9.COM","helloWorld",function(msg){
	// console.log(msg);
// })
// kk.viewActivity(function(msg){
	// console.log(msg);
// });

// kk.addActivity(7,"return",54,function(msg){
	// console.log(msg);
// });


// kk.viewAllLoans(function(msg){
	// console.log(msg);
// })
// kk.loanItem(7,54,function(msg){
	// console.log(msg);	
// })
// kk.viewLoansForOneUser(7,function(msg){
	// console.log(msg);
// })
// kk.returnItem(7,54,function(msg){
	// console.log(msg);
// })


// kk.login(user.email, user.password, function(g){
	// console.log(g);
// })
// kk.viewAllUsers(function(g){
	// console.log(g);
// })
// kk.addUser(user_2, function(g){
	// console.log(g);
// })
// kk.modifyUser(user_2, function(g){
	// console.log(g);
// })
// kk.deleteUser(user_2.UserId, function(g){
	// console.log(g);
// })


// kk.addItem(item_magazine,function(msg){
	// console.log(msg)
// })
// kk.deleteItem(55,function(msg){
	// console.log(msg)
// })
// kk.modifyItem(item_magazine,function(msg){
	// console.log(msg)
// })

/*
myBookMapper.deleteItem(1, function (msg) {
  console.log(msg);
});
*/


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "front-end/build")));
// by default the index.js file is fetche
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(require('./controllers'));



app.use(bodyParser.json());

/*
app.post("/auth/register", (req,res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address
  const phone = req.body.phone;
  const isAdmin = req.body.isAdmin;
  const password = encrypt.sha512(req.body.password);
  mysqldb.connect(function() {
    mysqldb.query("INSERT INTO Client (FirstName, LastName, Address, email, phone, type, password) VALUES ('"+firstName+"', '"+lastName+"', '"+address+"', '"+email+"', '"+phone+"', '"+isAdmin+"', '"+password+"');");
    res.send("Registration Successful");
  });
});

app.post("/auth/login", (req,res) => {
  const email = req.body.email;
  const password = encrypt.sha512(req.body.password);

  mysqldb.connect(function(err) {
    mysqldb.query("SELECT * FROM Client WHERE email ='"+email+"' AND password = '"+password+"';", function(err, result) {
      if (result.length == 0){
        res.send("login failed")
      }
      else {
        res.send(result)
      }
    });
  })
});
app.get("/api/customers", (req, res) => {
  const customers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@hotmail.com",
      phone: 5143295432,
      address: "532 Rue Carlton Montreal, Quebec Canada, F2D6F3"
    },
    {
      id: 2,
      firstName: "Brad",
      lastName: "Traversy",
      email: "bradtraversy@gmail.com",
      phone: 4383220156,
      address: "362 Rue Crescent Montreal, Quebec Canada, B2D7D3"
    },
    {
      id: 3,
      firstName: "Mary",
      lastName: "Swanson",
      email: "maryswanson@live.com",
      phone: 3849361843,
      address: "83 Rue Clark Montreal, Quebec Canada, S2F4L9"
    }
  ];

  res.json(customers);
});
*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
