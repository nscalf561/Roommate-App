var app = require('../server');

var House = require('../models/House');

var supplyController = {

	// Show all supplies
	index : function (req, res) {
		House.findOne({_id: req.params.hid}, function(err, house) {
			console.log(house);
			if (err) {
				console.log("error has occurred finding the house", err);
			} else {
				res.json({supplies: house.supplies});
			}
		});
	},

	// Create a new supply
	createSupply : function (req, res) {
		
		// House that we're adding the chore to
		House.findOne({_id: req.params.hid}, function(err, house) {
			console.log(house.supplies);
			if (err) {
				console.log("An error has occurred while finding the house:", err);
			} else {

				// Object we're going to save to db
				var newSupply = {
					item: req.body.item, 
					createdAt: new Date(),
					createdBy: "test" //TODO insert current user
				};

				// Saves the above object
				house.supplies.push(newSupply);

				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the supply to the house:", err);
					} else {
						console.log(house);
						res.json({supplies: house.supplies});
					}
				});

			}
		});		
	},

	showSupply : function (req, res) {

		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.supplies.forEach(function(supply) {
					if (supply._id == req.params.id) {
						return res.json({supply: supply});
					} else {
						res.status(500).send();
					}
				});
			}
		});

	},

	deleteSupply : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.supplies.forEach(function(supply) {
					if (supply._id == req.params.id) {
						var indexOfSupply = house.supplies.indexOf(supply);
						house.supplies.splice(indexOfSupply, 1);
					}
				});

				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the updated house.supplies array:", err);
					} else {
						console.log(house);
						res.status(400).send();
					}
				});

			}
		});
	}
};


module.exports = supplyController;