var mongoose = require('mongoose'),
		House = require('./house.js'),
		Schema = mongoose.Schema;

var userSchema = new Schema ({
	name: String,
	access_token: String,
	email: String,
	house: [House.schema]
});

var User = mongoose.model('User', userSchema);
module.exports = User;