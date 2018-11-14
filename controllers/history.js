const express = require('express');
const router = express.Router();

router.post("/transaction/view", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});

router.post("/log/view", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
});

module.exports = router;