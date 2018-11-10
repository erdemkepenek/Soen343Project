const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const encrypt = require("js-sha512"); 
const mysql = require("mysql");
const BookMapper = require("./class/Mapper/BookMapper.js");

let item = {
  "idDesc": 28,
  "title": "samsung",
  "author": "Shakespear",
  "format": "hardcopy",
  "pages": 342,
  "publisher": "Concordia",
  "ISBN10": null,
  "ISBN13": null,
  "language": "english"
}

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

myBookMapper=new BookMapper();
//myBookMapper.viewItems(function(msg){
  //console.log(msg);
//});

// myBookMapper.deleteItem(, function (msg) {
//   console.log(msg);
// });



myBookMapper.viewItems(function(msg){
  console.log("lol");
  //myBookMapper.commit(2);
  // myBookMapper.viewItems(2, function (msg) {
  //   console.log("22222222");
  //   console.log(msg);
  // });
});



//myBookMapper.commit(2);
// myBookMapper.deleteItem(2, item2.id);
// //myBookMapper.addItem(2, item);

// //myBookMapper.commit(2);
// let myCommits = myBookMapper.commit(2);
// console.log(myCommits);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "front-end/build")));
// by default the index.js file is fetche
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
