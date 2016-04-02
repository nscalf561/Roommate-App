var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var houseSchema = new Schema ({
	name: String, 
	address: String,
	// users: [User.schema]
});

var House = mongoose.model('House', houseSchema);
module.exports = House;