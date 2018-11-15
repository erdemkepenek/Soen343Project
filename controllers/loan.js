const express = require('express');
const Controller = require("../class/Controller.js");
const router = express.Router();

myController = new Controller();

router.post("/cart/add", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
	myController.loanAddItem(data.userId,data.data,function(msg){
		res.send(JSON.stringify(msg));
	})
});

router.post("/cart/remove", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});


router.post("/return/add", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});

router.post("/return/remove", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});

router.post("/view", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
})
router.post("/save/view", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
	myController.loanUncommitedWork(data.userId,function(msg){
		res.send(JSON.stringify(msg));
	})
    
});

router.post("/commit", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});


module.exports = router;