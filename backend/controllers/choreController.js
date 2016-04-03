var app = require('../server');
// var Chore = require('../models/Chore');
var House = require('../models/House');

var choreController = {

	// Show all chores
	index : function (req, res) {
		House.findOne({_id: req.params.id}, function(err, house) {
			console.log(house);
			if (err) {
				console.log("error has occurred finding the house", err);
			} else {
				console.log(house.chores);
				res.json({chores: house.chores});
			}
		});
	},

	// Create a new chore
	createChore : function (req, res) {
		
		// House that we're adding the chore to
		House.findOne({_id: req.params.id}, function(err, house) {
			console.log(house.chores);
			if (err) {
				console.log("An error has occurred while finding the house:", err);
			} else {

				// Object we're going to save to db
				var newChore = {
					task: req.body.task, 
					isCompleted: req.body.isCompleted,
					completedAt: req.body.completedAt,
					upvotes: req.body.upvotes,
					completedBy: req.body.completedBy,
					comments: req.body.comments
				};

				// Saves the above object
				house.chores.push(newChore);

				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the chore to the house:", err);
					} else {
						console.log(house);
						res.json({chores: house.chores});
					}
				});

			}
		});		
	},

	showChore : function (req, res) {

		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.chores.forEach(function(chore) {
					if (chore._id == req.params.id) {
						return res.json({chore: chore});
					}
				});
				res.json(500).send();
			}
		});

	},

	deleteChore : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.chores.forEach(function(chore) {
					if (chore._id == req.params.id) {
						var indexOfChore = house.chores.indexOf(chore);
						house.chores.splice(indexOfChore, 1);
					}
				});

				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the updated house.chores array:", err);
					} else {
						console.log(house);
						res.status(400).send();
					}
				});

			}
		});
	}
};

module.exports = choreController;