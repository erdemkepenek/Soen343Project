const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.js'));
router.use('/operation', require('./operation.js'));

router.get("/ab",function(req,res){
	res.send("FROM AB");
})

module.exports = router;