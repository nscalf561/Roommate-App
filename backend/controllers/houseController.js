var app 		= require('../server');
var House 	= require('../models/house');


var houseController = {

	// show all houses
	index : function (req, res) {
		House.find({}, function (err, houses) {
			if (err) {
				res.status(500).send();
				console.log("There was an error getting all of the households:", err);
			}
			res.json({houses: houses});
		});
	},


	// create a house
	createHouse : function (req, res) {
		var newHouse = new House({
			name: req.body.name, 
			address: req.body.address
		});

		newHouse.save(function(err, newHouse) {
			if (err) {
				res.status(500).send();
				console.log("There was an error saving the household:", err);
			} else {
				res.json({house: newHouse});
				console.log("The new household was successfully saved.");
			}
		});
	},


	// show an individual house
	showHouse : function (req, res) {
		House.find({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("There was an error getting this household:", err);
			} else {
				res.json({house: house});
			}
		});
	},


	// delete an individual house
	deleteHouse : function (req, res) {
		House.remove({_id: req.params.hid}, function (err) {
			if (err) {
				res.status(500).send();
				console.log("There was an error deleting the household:", err);
			} else {
				res.json({message: "Household deleted!"});
			}
		});
	},


	// update an individual house
	updateHouse : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("There was an error finding the household:", house);
			} 

			if (req.body.name) { house.name = req.body.name; }
			if (req.body.address) { house.address = req.body.address; }

			// find the house in the db, pass it the updated house object and save changes
			House.update({_id: req.params.hid}, house, function (err, house) {
				if (err) {
					res.status(500).send();
					console.log("There was an error updating the house:", err);
				} else {
					res.json({house: house});
				}
			});
		});
	}
};


module.exports = houseController;