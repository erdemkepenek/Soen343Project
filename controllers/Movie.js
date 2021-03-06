const express = require('express');
const Controller = require("../class/Controller.js");
const router = express.Router();

myController = new Controller();

router.post("/add", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.movieAdd(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/add/copy", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.movieAddCopy(data.userId, data.item,data.quantity, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/modify", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.movieModify(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/delete", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.movieDelete(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });

});
router.post("/remove/add", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.movieRemoveAdd(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/remove/modify", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.movieRemoveModify(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/remove/delete", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.movieRemoveDelete(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/view", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    myController.movieView(function (msg) {
        res.send(JSON.stringify(msg));
    });

});

router.post("/save/view", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.movieUncommitedWork(data.userId, function (msg) {
        res.send(JSON.stringify(msg));
    });

});

router.post("/commit", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.movieCommit(data.userId, function (msg) {
        res.send(JSON.stringify(msg));
    });

});
module.exports = router;