var app 	= require('../server');
var House 	= require('../models/house');


var choreController = {

	// show all chores
	index : function (req, res) {
		House.findOne({_id: req.params.hid}, function(err, house) {
			if (err) {
				console.log("error has occurred finding the house", err);
			} else {
				console.log(house);
				res.json({chores: house.chores});
			}
		});
	},

	// create a new chore
	createChore : function (req, res) {
		// find the house that we're adding the chore to
		House.findOne({_id: req.params.hid}, function(err, house) {
			if (err) {
				console.log("An error has occurred while finding the house:", err);
			} else {

				// object we're going to save to the house
				var newChore = {
					task: req.body.task, 
					isCompleted: req.body.isCompleted,
					completedAt: req.body.completedAt,
					upvotes: req.body.upvotes,
					completedBy: req.body.completedBy,
					comments: req.body.comments
				};

				// save the above object
				house.chores.push(newChore);
				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the chore to the house:", err);
					} else {
						res.json({chores: house.chores});
					}
				});
			}
		});		
	},


	// show an individual chore
	showChore : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.chores.forEach(function(chore) {
					if (chore._id == req.params.id) {
						return res.json({chore: chore});
					} else {
						res.status(500).send();
					}
				});
			}
		});
	},


	//update an individual chore
	updateChore : function (req, res) {
		// find the house the chore is nested in
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else { 
				
				// find the specific chore within the house
				house.chores.forEach(function(chore) {
					if (chore._id == req.params.id) {

						// change the chore details to reflect the new upvote and the user who upvoted it
						if (req.body.upvotes) { chore.upvotes = parseInt(req.body.upvotes); }
						if (req.body.upvotedBy) { chore.upvotedBy = req.body.upvotedBy; }
						if (req.body.completedAt) { chore.completedAt = req.body.completedAt; }
						if (req.body.comments) { chore.comments = req.body.comments; }

						// save these changes to the database
						house.save(function(err, house) {
							if (err) {
								console.log("There was an error saving the updated house.chores array:", err);
							} else {
								console.log('Your chore has been updated.');
								res.json({house: house});
							}
						});
					}
				});
			}
		});
	},


	// delete an individual chore
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
						console.log("the chore was successfully deleted");
						res.json({house: house});
					}
				});
			}
		});
	}
};


module.exports = choreController;