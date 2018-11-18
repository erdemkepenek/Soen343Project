const express = require('express');
const Controller = require("../class/Controller.js");
const router = express.Router();

myController = new Controller();

router.post("/cart/add", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
	myController.loanAddItem(data.userId,data.item,function(msg){
		res.send(JSON.stringify(msg));
	})
});
router.post("/cart/remove", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.loanRemoveAdd(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
//Use this API call if needed
router.post("/return/remove", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});
router.post("/return", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.loanAddReturn(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    })
});
router.post("/view/all", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.loanViewAll(function (msg) {
        res.send(JSON.stringify(msg));
    })
});
router.post("/view/user", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.loanViewUser(data.userId,function (msg) {
        res.send(JSON.stringify(msg));
    })
});
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
    myController.loanCommit(data.userId, function (msg) {
        res.send(JSON.stringify(msg));
    })
});
module.exports = router;