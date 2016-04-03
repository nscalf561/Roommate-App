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
				console.log("There was an error getting this household:", err);
			} else {
				
				var choreLength = house.chores.length;
				for (var x = 0; x < choreLength; x++) {

					// console.log("this is the id:", house.chores[x]._id);
					// console.log("id in url:", req.params.id);
					// console.log(house.chores[x]._id == req.params.id);
					
					if (house.chores[x]._id == req.params.id) {
						// console.log("second chore call:", house.chores);
						return res.json({chore: house.chores[x]});
					}
				}
			}
		});

	}

};

module.exports = choreController;