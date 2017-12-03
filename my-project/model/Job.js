
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobSchema = new Schema({
    logo : String,
    job_title      : String,
    company_name    : String,
    experience    : Number,
    job_type    : String,
    location    : String,
    salary    : Number,
    flag     : { type: Number, default: 1 },
    date     : { type: Date, default: Date.now }
});

var JobModel = mongoose.model('job', JobSchema);

module.exports = JobModel;