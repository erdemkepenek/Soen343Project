const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.js'));
router.use('/operation', require('./operation.js'));
router.use('/book', require('./book.js'));
router.use('/music', require('./music.js'));
router.use('/movie', require('./movie.js'));
router.use('/magazine', require('./magazine.js'));
router.use('/user', require('./user.js'));
router.use('/loan', require('./loan.js'));
router.use('/history', require('./history.js'));

router.get("/ab",function(req,res){
	res.send("FROM AB");
})

module.exports = router;