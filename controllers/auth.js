const express = require('express');
const router = express.Router();

router.get("/login",function(req,res){
	res.setHeader('Content-Type', 'application/json');
	data = myMapper.login("hello","bye");
	res.send(JSON.stringify(data));
})
router.get("/signup",function(req,res){
	res.setHeader('Content-Type', 'application/json');
	data = myMapper.registerUser();
	res.send(JSON.stringify({sample:"registration"}));
})

module.exports = router;