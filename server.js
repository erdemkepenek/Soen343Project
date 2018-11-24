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
const transactionHistoryTDG = require("./class/TDG/transactionHistoryTDG.js");
const LoanTDG = require("./class/TDG/LoanTDG.js");
const itemTDG_ = require("./class/Mapper/LogActivityMapper.js");
const itemTDG = require("./class/Controller.js");
const Controller = require("./class/Controller.js");



// Serve static files from the React app
app.use(express.static(path.join(__dirname, "front-end/build")));
// by default the index.js file is fetche
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(require('./controllers'));



app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
