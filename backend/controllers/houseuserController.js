var app 	= require('../server.js'),
	// House 	= require('../models/house'),
	User 	= require('../models/user'),
	jwt 	= require('jwt-simple'),
	config    = require('../config/database'),
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

		var occupant = new HouseUser({
			houseId: req.body.houseId, 
			userId: req.body.userId
		});

		occupant.save(function(err, occupant) {
			if (err) {
				// res.status(500).send();
				console.log("There was an error joining household:", err);
			} else {
				// res.status(200).send();
				console.log("Successfuly joined household!");
			}
		});

		User.findOne({_id: occupant.userId}, function(err, user) {
			if (err) {
				console.log("error getting the user joining a house:", err);
			} else {
				console.log(occupant.houseId);
				user.households.push(occupant.houseId);
				user.save(function(err, user) {
					if (err) {
						console.log("There was an error saving the user's houseId", err);
					} else {
						var token = jwt.encode(user, config.secret);
						console.log(token);
          				// return the information including token as JSON
          				
          				res.json({success: true, token: 'JWT ' + token});

						console.log("Successfully saved houseId in user.households");
					}
				});
			}
		});
	},
};

module.exports = houseuserController;