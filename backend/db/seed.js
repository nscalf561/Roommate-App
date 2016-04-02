var User = require('../models/user.js');
var House = require('../models/house.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project4');
console.log("connected to db");


var userList = [
	{
		name: "Jessie",
		email: "cheese@cheeseLovers.net"
	},
	{
		name: "Caleb",
		email: "caleb@caleb.com"
	}
];

User.remove({}, function (err, users) {
	if (err) {
		console.log("error removing user:", err);
		process.exit();
		mongoose.connection.close();
	} else {
		console.log("users deleted");
		User.create(userList, function (err, user) {
			if (err) {
				console.log("error creating new user:", err);
				process.exit();
				mongoose.connection.close();
			}
		});
	}
});