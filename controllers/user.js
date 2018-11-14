const express = require('express');
const router = express.Router();

router.post("/login", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
})

router.post("/logout", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
})


router.post("/add", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
});

router.post("/modify", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
})

router.post("/delete", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
})
router.post("/view", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
})
router.post("/save/view", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
})

router.post("/commit", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
})


module.exports = router;