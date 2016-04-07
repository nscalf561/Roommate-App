var app 		= require('../server');
var House 	= require('../models/house');

var completedChoreController = {


	// show all completed chores
	index : function (req, res) {
		House.findOne({_id: req.params.hid}, function(err, house) {
			if (err) {
				console.log("error has occurred finding the house", err);
			} else {
				console.log(house);
				res.json({completedChores: house.completedChores});
			}
		});
	},

	// create a new instance of completed chore
	createCompletedChore : function (req, res) {
		// find the house that we're adding the chore to
		House.findOne({_id: req.params.hid}, function(err, house) {
			if (err) {
				console.log("An error has occurred while finding the house:", err);
			} else {

				// object we're going to save to the house
				var newCompletedChore = {
					task: req.body.task, 
					completedAt: req.body.completedAt,
					completedByName: req.body.completedByName,
					completedById: req.body.completedById
				};

				console.log(req.body);

				// save the above object
				house.completedChores.push(newCompletedChore);
				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the chore to the house:", err);
					} else {
						res.json({completedChores: house.completedChores});
					}
				});
			}
		});		
	},


	// show an individual completed chore
	showCompletedChore : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.completedChores.forEach(function(completedChore) {
					if (completedChore._id == req.params.id) {
						return res.json({completedChore: completedChore});
					} else {
						res.status(500).send();
					}
				});
			}
		});
	},


	// delete an individual completed chore
	deleteCompletedChore : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.completedChores.forEach(function(completedChore) {
					if (completedChore._id == req.params.id) {
						var indexOfChore = house.completedChores.indexOf(completedChore);
						house.completedChores.splice(indexOfChore, 1);
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

module.exports = completedChoreController;