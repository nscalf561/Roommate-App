var app = require('../server');
var Chore = require('../models/chore');

var choreController = {

	// Show all chores
	index : function (req, res) {
		Chore.find({}, function (err, chores) {
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
		newChore.save(function(err) {
			if (err) {
				res.status(500).send();
				console.log("There was an error saving the chore:", err);
			} else {
				console.log("The new chore was successfully saved.");
			}
		});

	},

};

module.exports = choreController;