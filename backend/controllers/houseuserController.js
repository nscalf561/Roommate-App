var app 	= require('../server.js'),
	// House 	= require('../models/house'),
	// User 	= require('../models/user'),
	HouseUser = require('../models/houseUser');

var houseuserController = {
	showHouseUser : function (req, res) {
		HouseUser.find({}, function (err, houseusers) {
			if (err) {
				res.status(500).send();
				console.log("There was an error getting all of the occupants:", err);
			}
			res.json({houseusers: houseusers});
		});
	},

	joinHouse: function(req, res) {
		console.log("user has joined house");
	}

};

module.exports = houseuserController;