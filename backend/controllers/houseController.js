var app = require('../server.js');
var House = require('../models/house.js');

var houseController = {
	//show all page for houses
	index : function (req, res) {
		House.find({}, function (err, houses) {
			if (err) {
				console.log("There was an error getting all of the houses:", err);
			}
			res.json({houses: houses});
		});
	},
};

module.exports = houseController;