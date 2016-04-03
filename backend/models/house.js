var mongoose = require('mongoose'),
		User = require('./User'),
		Chore = require('./Chore'),
		Schema = mongoose.Schema;

var HouseSchema = new Schema ({
	name: String, 
	address: String,
	users: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}], 
	chores: [{
		type: Schema.Types.ObjectId,
		ref: 'Chore'
	}]
});

var House = mongoose.model('House', HouseSchema);
module.exports = House;