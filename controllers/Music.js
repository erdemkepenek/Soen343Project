const express = require('express');
const Controller = require("../class/Controller.js");
const router = express.Router();

myController = new Controller();

router.post("/add", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.musicAdd(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/modify", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.musicModify(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/delete", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.musicDelete(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });

});
router.post("/remove/add", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.musicRemoveAdd(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/remove/modify", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.musicRemoveModify(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/remove/delete", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.musicRemoveDelete(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/view", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    myController.musicView(function (msg) {
        res.send(JSON.stringify(msg));
    });

});

router.post("/save/view", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.musicUncommitedWork(data.userId, function (msg) {
        res.send(JSON.stringify(msg));
    });

});

router.post("/commit", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.musicCommit(data.userId, function (msg) {
        res.send(JSON.stringify(msg));
    });

});
module.exports = router;