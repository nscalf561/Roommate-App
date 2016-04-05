var app 	= require('../server');
var User 	= require('../models/user');


var userController = {

	// show all users
	index : function (req, res) {
		User.find({}, function (err, users) {
			if (err) {
				res.status(500).send();
				console.log("There was an error getting all of the users:", err);
			}
			res.json({users: users});
		});
	},


	// show an individual user
	showUser : function (req, res) {
		User.findOne({_id: req.params.id}, function (err, user) {
			if (err) {
				res.status(500).send();
				console.log("There was an error getting this user:", err);
			}
			res.json({user: user});
		});
	},


	// delete an individual user
	deleteUser : function (req, res) {
		User.remove({_id: req.params.id}, function (err) {
			if (err) {
				res.status(500).send();
				console.log("There was an error deleting the user:", err);
			} else {
				res.json({message: "user deleted"});
			}
		});
	}
};


module.exports = userController;