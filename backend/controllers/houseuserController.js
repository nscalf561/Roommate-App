var app 	= require('../server.js'),
	// House 	= require('../models/house'),
	// User 	= require('../models/user'),
	HouseUser = require('../models/houseUser');

var houseuserController = {
	showHouseUser : function (req, res) {
		HouseUser.find({}, function (err, occupants) {
			if (err) {
				res.status(500).send();
				console.log("There was an error getting all of the occupants:", err);
			}
			res.json({occupants: occupants});
		});
	},

	joinHouse: function (req, res) {
		console.log(req.body);
		var occupant = new HouseUser({
			houseId: req.body.houseId, 
			userId: req.body.userId
		});

		occupant.save(function(err, occupant) {
			if (err) {
				res.status(500).send();
				console.log("There was an error joining household:", err);
			} else {
				res.status(200).send();
				console.log("Successfuly joined household!");
			}
		});
	},
};

module.exports = houseuserController;