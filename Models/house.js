var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var houseSchema = new Schema ({
	// TODO
});

var House = mongoose.model('House', houseSchema);
module.exports = House;