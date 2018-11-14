const express = require('express');
const router = express.Router();

router.post("/add",function(req,res){
	let received_data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
	
});

router.post("/modify",function(req,res){
	let received_data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
	
});

router.post("/delete",function(req,res){
	let received_data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
	
});

router.post("/view",function(req,res){
	let received_data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
	
});

router.post("/save/view",function(req,res){
	let received_data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
	
});

router.post("/commit",function(req,res){
	let received_data = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("hello"));
	
});






module.exports = router;