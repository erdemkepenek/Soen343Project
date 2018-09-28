const express = require("express");
const path = require("path");
const app = express();
Mapper = require("./class/Mapper.js");
const TDG = require("./class/TDG.js");
 let myTDG = new TDG();
myTDG.fetchUsers(function(data){
  console.log(data);
});
myTDG.login('Anthony@concordia.ca','9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043',function(data){
  console.log(data);
});
myTDG.registerUser('Anthony','Iatropoulos','00019 Concordia University, Montreal, Quebec','Anthony@concordia.ca',2147483647,1,'9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043');

myMapper = new Mapper();


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "front-end/build")));
// by default the index.js file is fetched
app.use(require('./controllers'));


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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
