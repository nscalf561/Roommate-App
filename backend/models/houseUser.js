var mongoose = require('mongoose'),
		House = mongoose.model('House'),
	  User = mongoose.model('User'),
		Schema = mongoose.Schema;

var HouseUserSchema = new Schema ({
	houseId : {type: Schema.Types.ObjectId, ref: 'House'},
	userId : {type: Schema.Types.ObjectId, ref: 'User'}
});

var HouseUser = mongoose.model('HouseUser', HouseUserSchema);
module.exports = HouseUser;