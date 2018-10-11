const express = require('express');
const router = express.Router();

router.post("/getusers",function(req,res){
	res.setHeader('Content-Type', 'application/json');
	data = myMapper.viewUsers();
	res.send(JSON.stringify(data));
})

module.exports = router;