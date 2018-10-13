const express = require('express');
const router = express.Router();

router.post("/login",function(req,res){
	let login = req.body;
	res.setHeader('Content-Type', 'application/json');
	myMapper.login(login.email,login.password, function(data){
		res.send(JSON.stringify(data));
	});
	
})
router.post("/signup",function(req,res){
	let register = req.body;
	res.setHeader('Content-Type', 'application/json');
	let success = myMapper.registerUser(
		register.email, 
		register.firstName, 
		register.lastName, 
		register.address, 
		register.phone, 
		register.isAdmin, 
		register.password);
	let data = {
		success:success
	}
	res.send(JSON.stringify(data));
})

module.exports = router;