var mongoose = require('mongoose'),
		House = require('./house'),
		Schema = mongoose.Schema;

var UserSchema = new Schema ({
	name: String,
	email: String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;