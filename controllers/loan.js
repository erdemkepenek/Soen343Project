const express = require('express');
const router = express.Router();

router.post("/cart/add", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});

router.post("/cart/remove", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});


router.post("/return/add", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});

router.post("/return/remove", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});

router.post("/view", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
})
router.post("/save/view", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});

router.post("/commit", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});


module.exports = router;