var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var userSchema = new Schema ({
	// TODO
});

var User = mongoose.model('User', userSchema);
module.exports = User;