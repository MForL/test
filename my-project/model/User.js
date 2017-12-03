
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : String,
    psw      : String,
    email    : String,
    date     : { type: Date, default: Date.now }
});

var UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;