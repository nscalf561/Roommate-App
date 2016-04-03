var mongoose = require('mongoose'),
		Chore = require('./Chore'),
		House = require('./House'),
		Schema = mongoose.Schema;

var HouseChoreSchema = new Schema ({
	houseId : {type: Schema.Types.ObjectId, ref: 'House'},
	choreId : {type: Schema.Types.ObjectId, ref: 'Chore'}
});

var HouseChore = mongoose.model('HouseChore', HouseChoreSchema);
module.exports = HouseChore;