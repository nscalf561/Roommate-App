var app = require('../server');
var Chore = require('../models/Chore');
var HouseChore = require('../models/HouseChore');

var choreController = {

	// Show all chores
	index : function (req, res) {
		db.Chore.find({}, function (err, chores) {
			if (err) {
				res.status(500).send();
				console.log("There was an error getting all of the chores:", err);
			}
			res.json({chores: chores});
		});
	},

	// Create a new chore
	createChore : function (req, res) {
		// Object we're going to save to db
		var newChore = new Chore({
			task: req.body.task, 
			isCompleted: req.body.isCompleted,
			completedAt: req.body.completedAt,
			upvotes: req.body.upvotes,
			completedBy: req.body.completedBy,
			comments: req.body.comments
		});

		// Saves the above object, warns if an error occurs
		newChore.save(function(err, newChore) {
			if (err) {
				res.status(500).send();
				console.log("There was an error saving the chore:", err);
			} else {
				console.log("The new chore was successfully saved.");
				
				var houseChore = {
					houseId: req.params.id,
					choreId: newChore._id
				};

				db.HouseChore.create(houseChore, function(err, houseChore) {
					console.log("m2m association made", houseChore);
				});
			}
		});

	},

	showChore : function (req, res) {
		db.Chore.find({_id: req.params.id}, function (err, chore) {
			if (err) {
				res.status(500).send();
				console.log("There was an error getting this chore:", err);
			} else {
				res.json({chore: chore});
			}
		});
	}

};

module.exports = choreController;