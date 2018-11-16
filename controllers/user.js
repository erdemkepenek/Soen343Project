const express = require('express');
const Controller = require("../class/Controller.js");
const router = express.Router();

myController = new Controller();

router.post("/login", function (req, res) {
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
	myController.userLogin(user.email,user.password,function(msg){	console.log(msg)
		if(msg.success === 'true'){
            myController.logActivityMapperAdd(msg.data.UserId,"login",function(msg_log){
                res.send(JSON.stringify(msg));
            })
		}else{
            res.send(JSON.stringify(msg));
		}

	})
 
});

router.post("/logout", function (req, res) {
    let data = req.body;
    res.setHeader('Content-Type', 'application/json');
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
    myController.userDelete(user.userId,user.data.UserId,function(msg){	
		res.send(JSON.stringify(msg));
	})
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