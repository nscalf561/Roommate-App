var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var houseSchema = new Schema ({
	id: String,
	name: String, 
	address: String
});

var House = mongoose.model('House', houseSchema);
module.exports = House;