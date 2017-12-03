var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
	res.render("login", {username: ""});
});

router.get('/logout', function(req, res, next) {
	req.session.username = null;
	res.render("login", {username: ""});
});


router.post('/regist', function(req, res, next) {
	UserModel.find({username: req.body.username}, (err, docs)=>{
		var result = {
			code: 1
		}
		if(err || docs.length > 0) {
			result.code = -99;
			result.message = "用户名存在或者服务器出错了";
			res.send(JSON.stringify(result));
			return;
		}
		var um = new UserModel();
		um.username = req.body.username;
		um.psw = req.body.psw;
		um.email = req.body.email;
		um.save((err)=>{
			if(err) {
				result.code = -98;
				result.message = "注册失败";				
			} 
			res.send(JSON.stringify(result));
		})
	})
});

router.post('/login', function(req, res, next) {
	UserModel.find({username: req.body.username, psw: req.body.psw}, (err, docs)=>{
		var result = {
			code: 1
		}
		if(err || docs.length == 0) {
			result.code = -97;
			result.message = "用户名或者密码错误，请重新输入";
		} else {
			req.session.username = req.body.username;
		}
		res.send(JSON.stringify(result));
	})
});


module.exports = router;
