var express = require('express');
var router = express.Router();
var JobModel = require("../model/Job");
var multiparty = require('multiparty');
var perPageDisplayCount = 3;

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.session || !req.session.username) {
		res.redirect("/users/login");
		return;
	}

	JobModel.find({flag: 1}, (err, docs)=>{
		if(err) {
			console.log(err);
		}
		var totalPage = Math.ceil(docs.length / perPageDisplayCount);
		var pageNo = req.query.pageNo ? req.query.pageNo : 1;
		if(pageNo) {
			docs = docs.slice((pageNo -1)*perPageDisplayCount, (pageNo -1)*perPageDisplayCount+perPageDisplayCount);
		}
		res.render("menu", {jobList: docs, pageNo: pageNo, totalPage: totalPage, username: req.session.username});
	})
});

router.post('/createJob', function(req, res, next) {
	var form = new multiparty.Form({uploadDir: "./public/images"});
    form.parse(req, function(err, fields, files) {
    	if(err) {
    		console.log(err);
    	}
    	console.log(fields);
    	console.log(files);

    	var j = new JobModel();
    	j.logo=files.logo[0].path.replace("public", "");
    	j.job_title=fields.job_title[0];
    	j.company_name=fields.company_name[0];
    	j.experience=fields.experience[0];
    	j.job_type=fields.job_type[0];
    	j.location=fields.location[0];
    	j.salary=fields.salary[0];
    	j.save((err)=>{
    		var result = {
    			code:1
    		}
    		if(err) {
    			console.log(err);
    			result.code = -89;
    			result.message = "文件上传失败";
    		}
    		res.send(JSON.stringify(result));
    	})
    });
});

router.post('/updateJob', function(req, res, next) {
	var result = {
		code:1
	}
	var form = new multiparty.Form({uploadDir: "./public/images"});
    form.parse(req, function(err, fields, files) {
    	if(err) {
    		console.log(err);
    	}
    	console.log(fields);
    	console.log(fields.job_id[0]);

    	JobModel.find({_id: fields.job_id[0]}, (err, docs)=>{
    		console.log(docs.length);
    		if(!err && docs.length > 0) {
    			var j = docs[0];
    			if(files.logo && files.logo.length > 0) {
		    		j.logo=files.logo[0].path.replace("public", "");
    			}
		    	j.job_title=fields.job_title[0];
		    	j.company_name=fields.company_name[0];
		    	j.experience=fields.experience[0];
		    	j.job_type=fields.job_type[0];
		    	j.location=fields.location[0];
		    	j.salary=fields.salary[0];
		    	j.save((err)=>{
		    		if(err) {
		    			console.log(err);
		    			result.code = -87;
		    			result.message = "职位信息更新失败";
		    		}
		    		res.send(JSON.stringify(result));
		    	})
    		} else {
    			result.code = -86;
    			result.message = "您要更新的职位不存在";
    			res.send(JSON.stringify(result));
    		}
    	})


    });
});

router.post('/delJob', function(req, res, next) {
	JobModel.update({_id: req.body.id}, {flag: 0}, (err)=>{
		var result = {
			code:1
		}
		if(err) {
			console.log(err);
			result.code = -88;
			result.message = "删除失败";
		}
		res.send(JSON.stringify(result));
	})
});

module.exports = router;
