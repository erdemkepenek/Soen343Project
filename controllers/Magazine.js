const express = require('express');
const Controller = require("../class/Controller.js");
const router = express.Router();

myController = new Controller();

router.post("/add", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.magazineAdd(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/add/copy", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.magazineAddCopy(data.userId, data.item,data.quantity, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/modify", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.magazineModify(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/delete", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.magazineDelete(data.userId, data.item, function (msg) {
        res.send(JSON.stringify(msg));
    });

});
router.post("/remove/add", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.magazineRemoveAdd(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/remove/modify", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.magazineRemoveModify(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/remove/delete", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.magazineRemoveDelete(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/view", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    myController.magazineView(function (msg) {
        res.send(JSON.stringify(msg));
    });

});

router.post("/save/view", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.magazineUncommitedWork(data.userId, function (msg) {
        res.send(JSON.stringify(msg));
    });

});

router.post("/commit", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.magazineCommit(data.userId, function (msg) {
        res.send(JSON.stringify(msg));
    });

});
module.exports = router;