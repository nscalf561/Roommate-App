var mongoose = require('mongoose'),
		User = require('./user'),
		Schema = mongoose.Schema;

var HouseSchema = new Schema ({
	name: String, 
	address: String,
	users: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
});

var House = mongoose.model('House', HouseSchema);
module.exports = House;