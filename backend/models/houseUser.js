var mongoose = require('mongoose'),
		User = require('./User'),
		House = require('./House'),
		Schema = mongoose.Schema;

var HouseUserSchema = new Schema ({
	houseId : {type: House.Types.ObjectId, ref: 'House'},
	userId : {type: House.Types.ObjectId, ref: 'User'}
});

var HouseUser = mongoose.model('HouseUser', HouseUserSchema);
module.exports = HouseUser;