const express = require('express');
const Controller = require("../class/Controller.js");
const router = express.Router();

myController = new Controller();

router.post("/transaction/view", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.transactionHistoryView(function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/log/view", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.logActivityMapperView(function (msg) {
        res.send(JSON.stringify(msg));
    });
});

module.exports = router;