var app 		= require('../server');
var House 	= require('../models/house');


var supplyController = {

	// show all supplies
	index : function (req, res) {
		House.findOne({_id: req.params.hid}, function(err, house) {
			if (err) {
				console.log("error has occurred finding the house", err);
			} else {
				res.json({supplies: house.supplies});
			}
		});
	},

	// create a new supply
	createSupply : function (req, res) {
		// find house that we're adding the supply to
		House.findOne({_id: req.params.hid}, function(err, house) {
			if (err) {
				console.log("An error has occurred while finding the house:", err);
			} else {

				// supply object we're going to save to db
				var newSupply = {
					item: req.body.item, 
					createdAt: new Date(),
					createdBy: "test" // TODO insert current user
				};

				// saves the above supply object
				house.supplies.push(newSupply);
				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the supply to the house:", err);
					} else {
						res.json({supplies: house.supplies});
					}
				});
			}
		});		
	},


	// show an individual supply
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


	// delete an individual supply
	deleteSupply : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {

				// find the nested supply we want to delete and remove it from the house
				house.supplies.forEach(function(supply) {
					if (supply._id == req.params.id) {
						var indexOfSupply = house.supplies.indexOf(supply);
						house.supplies.splice(indexOfSupply, 1);
					}
				});

				// save these changes to the house so they persist in the database
				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the updated house.supplies array:", err);
					} else {
						res.status(400).send();
					}
				});
			}
		});
	}
};


module.exports = supplyController;