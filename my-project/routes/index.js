var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.session || !req.session.username) {
		res.redirect("/users/login");
	}
	else {
		res.redirect("/menu");
	}
});

module.exports = router;
