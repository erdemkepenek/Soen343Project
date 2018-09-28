const express = require('express');
const router = express.Router();

router.get("/getusers",function(req,res){
	res.setHeader('Content-Type', 'application/json');
	data = myMapper.login("hello","bye");
	res.send(JSON.stringify(data));
})

module.exports = router;