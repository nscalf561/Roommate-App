var mongoose = require('mongoose'),
		User = require('./user'),
		Chore = require('./chore'),
		Schema = mongoose.Schema;

var HouseSchema = new Schema ({
	name: String, 
	address: String,
	users: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}], 
	chore: [Chore.schema]
});

var House = mongoose.model('House', HouseSchema);
module.exports = House;