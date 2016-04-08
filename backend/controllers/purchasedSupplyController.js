var app 		= require('../server');
var House 	= require('../models/house');

var purchasedSupplyController = {


	// show all purchased supplies
	index : function (req, res) {
		House.findOne({_id: req.params.hid}, function(err, house) {
			if (err) {
				console.log("error has occurred finding the house", err);
			} else {
				console.log(house);
				res.json({purchasedSupplies: house.purchasedSupplies});
			}
		});
	},

	// create a new instance of purchased supply
	createPurchasedSupply : function (req, res) {
		// find the house that we're adding the chore to
		House.findOne({_id: req.params.hid}, function(err, house) {
			if (err) {
				console.log("An error has occurred while finding the house:", err);
			} else {

				// object we're going to save to the house
				var newPurchasedSupply = {
					item: req.body.item, 
					purchasedByName: req.body.purchasedByName,
					purchasedById: req.body.purchasedById,
					purchasedOn: req.body.purchasedOn
				};

				// save the above object
				house.purchasedSupplies.push(newPurchasedSupply);
				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the chore to the house:", err);
					} else {
						res.json({purchasedSupplies: house.purchasedSupplies});
					}
				});
			}
		});		
	},


	// show an individual purchased supply
	showPurchasedSupply : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.purchasedSupplies.forEach(function(purchasedSupply) {
					if (purchasedSupply._id == req.params.id) {
						return res.json({purchasedSupply: purchasedSupply});
					} else {
						res.status(500).send();
					}
				});
			}
		});
	},


	// delete an individual purchased supply
	deletePurchasedSupply : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.purchasedSupplies.forEach(function(purchasedSupply) {
					if (purchasedSupply._id == req.params.id) {
						var indexOfChore = house.purchasedSupplies.indexOf(purchasedSupply);
						house.purchasedSupplies.splice(indexOfChore, 1);
					}
				});

				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the updated house.chores array:", err);
					} else {
						console.log("the chore was successfully deleted");
						res.json({house: house});
					}
				});
			}
		});
	}

};
module.exports = purchasedSupplyController;