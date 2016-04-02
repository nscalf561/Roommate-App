var app = require('../server.js');
var User = require('../models/user.js');


var userController = {

	//show all page for users
	index : function (req, res) {
		User.find({}, function (err, users) {
			if (err) {
				res.status(500).send();
				console.log("There was an error getting all of the users:", err);
			}
			res.json({users: users});
		});
	},

	showUser : function (req, res) {
		User.findOne({_id: req.params.id}, function (err, user) {
			if (err) {
				res.status(500).send();
				console.log("There was an error getting this user:", err);
			}
			res.json({user: user});
		});
	},

	deleteUser : function (req, res) {
		User.remove({_id: req.params.id}, function (err) {
			if (err) {
				res.status(500).send();
				console.log("There was an error deleting the user:", err);
			} else {
				// res.redirect("/logout");
				res.json({message: "user deleted"});
			}
		});
	}


};

module.exports = userController;