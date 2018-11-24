const express = require('express');
const Controller = require("../class/Controller.js");
const router = express.Router();

myController = new Controller();

router.use('/auth', require('./auth.js'));
router.use('/operation', require('./operation.js'));
router.use('/book', require('./Book.js'));
router.use('/music', require('./Music.js'));
router.use('/movie', require('./Movie.js'));
router.use('/magazine', require('./Magazine.js'));
router.use('/user', require('./user.js'));
router.use('/loan', require('./loan.js'));
router.use('/history', require('./history.js'));

router.get("/ab",function(req,res){
	res.send("FROM AB");
})
router.post("/catalog/view",function(req,res){
	res.setHeader('Content-Type', 'application/json');
	myController.catalogView(function (msg) {
		console.log(msg);
        res.send(JSON.stringify(msg));
    });
})

module.exports = router;