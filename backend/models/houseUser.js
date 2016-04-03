var mongoose = require('mongoose'),
		User = require('./user'),
		House = require('./house'),
		Schema = mongoose.Schema;

var HouseUserSchema = new Schema ({
	houseId : {type: Schema.Types.ObjectId, ref: 'House'},
	userId : {type: Schema.Types.ObjectId, ref: 'User'}
});

var HouseUser = mongoose.model('HouseUser', HouseUserSchema);
module.exports = HouseUser;