const express = require('express');
const Controller = require("../class/Controller.js");
const router = express.Router();

myController = new Controller();
// COMP 346 style,
let admin_login_lock = 1;

router.post("/login", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
	myController.userLogin(user.email,user.password,function(msg){	console.log(msg)
		if(msg.success === 'true'){
			if( (msg.data.type===1 && admin_login_lock===1) || msg.data.type===0 ){
				if(msg.data.type===1){
					//take lock
					admin_login_lock = 0;
				}
				myController.logActivityMapperAdd(msg.data.UserId,"login",function(msg_log){
					res.send(JSON.stringify(msg));
				})
			}
			else{
				res.send(JSON.stringify({success:"false",message:"An admin is already logged in"}));
			}
		}else{
            res.send(JSON.stringify(msg));
		}

	})
 
});

router.post("/logout", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
	if(data.data.type=1){
		//Release lock;
		admin_login_lock=1;
	}
    myController.logActivityMapperAdd(data.data.UserId,"logout",function(msg){
        res.send(JSON.stringify(msg));
    })
});

router.post("/add", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
	myController.userAdd(user.userId,user.data,function(msg){	
		res.send(JSON.stringify(msg));
	})
    
});

router.post("/modify", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.userModify(user.userId,user.data,function(msg){	
		res.send(JSON.stringify(msg));
	})
});

router.post("/delete", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.userDelete(user.userId,user.data,function(msg){
		res.send(JSON.stringify(msg));
	})
});
router.post("/remove/add", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.userRemoveAdd(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/remove/modify", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.userRemoveModify(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});

router.post("/remove/delete", function (req, res) {
    let data = req.body;
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    myController.userRemoveDelete(data.userId, data.index, function (msg) {
        res.send(JSON.stringify(msg));
    });
});
router.post("/view", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
	myController.userView(function(msg){	
		res.send(JSON.stringify(msg));
	})
})
router.post("/save/view", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
	myController.userUncommitedWork(user.userId,function(msg){	
		res.send(JSON.stringify(msg));
	})
});

router.post("/commit", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    myController.userCommit(user.userId,function(msg){	
		res.send(JSON.stringify(msg));
	})
});


module.exports = router;