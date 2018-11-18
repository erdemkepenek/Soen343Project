const express = require('express');
const Controller = require("../class/Controller.js");
const router = express.Router();

myController = new Controller();

router.post("/add", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
	console.log(data);
    myController.bookAdd(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/remove/add", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.bookRemoveAdd(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/modify", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.bookModify(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/remove/modify", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.bookRemoveModify(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/delete", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.bookDelete(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });

});
router.post("/remove/add", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.bookRemoveAdd(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/remove/modify", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.bookRemoveModify(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/remove/delete", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.bookRemoveDelete(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/view", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    myController.bookView(function(msg){
        res.send(JSON.stringify(msg));
    });
    
});

router.post("/save/view", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.bookUncommitedWork(data.userId,function (msg) {
        res.send(JSON.stringify(msg));
    });

});

router.post("/commit", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.bookCommit(data.userId, function (msg) {
        res.send(JSON.stringify(msg));
    });

});
module.exports = router;