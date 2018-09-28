const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
Mapper = require("./class/Mapper.js");
const TDG = require("./class/TDG.js");
 let myTDG = new TDG();
myTDG.login('Anthony@concordia.ca','hello',function(data){
  console.log(data);
});
myTDG.registerUser('Eglenbro','Cecaj','00040 Concordia University, Montreal, Quebec','eglen@concordia.ca',2147433649,'1','eglencecaj');

myTDG.mysqlConnection.end();
myMapper = new Mapper();


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "front-end/build")));
// by default the index.js file is fetche
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
