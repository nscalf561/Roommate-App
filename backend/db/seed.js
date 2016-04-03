var User = require('../models/user');
var House = require('../models/house');
var HouseUser = require('../models/houseUser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project4');
// console.log("connected to db");

User.remove({}, function(err, users){});
House.remove({}, function(err, houses){});
HouseUser.remove({}, function(err, houseUsers){});

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

User.create(userList, function(err, users) {
	console.log("users created", users);
	var houseList = [
		{
			name: "Monastery",
			address: "2335 Warring St, Berkeley, CA",
			users: ["57005ba0df8ed6cf273701a5"]
		}
	];

	//create house
	House.create(houseList, function(err, houses) {
		console.log("created houses", houses);
		console.log("users:", users);
		console.log("houses:", houses);

		var house1 = houses[0];
		var user1 = users[0];
		var user2 = users[1];

		//associate users with houses
		var houseUsersList = [
			{
				userId: user1._id,
				houseId: house1._id
			},
			{
				userId: user2._id,
				houseId: house1._id
			}
		];

		//creating the join table
		HouseUser.create(houseUsersList, function(err, houseUsers) {
			console.log("m2m association made", houseUsers);
			mongoose.disconnect();
		});

	});


});



// User.remove({}, function (err) {
// 	if (err) {
// 		console.log("error removing user:", err);
// 		process.exit();
// 		mongoose.connection.close();
// 	} else {
// 		console.log("users deleted");
// 		User.create(userList, function (err, users) {
// 			if (err) {
// 				console.log("error creating new user:", err);
// 				process.exit();
// 				mongoose.connection.close();
// 			} else {
// 				var user1 = userList[0];
// 				var user2 = userList[1];


// 				// console.log("Users reseeded");
// 			}
// 		});
// 	}
// });

// House.remove({}, function (err) {
// 	if (err) {
// 		console.log("error removing user:", err);
// 		process.exit();
// 		mongoose.connection.close();
// 	} else {
// 		console.log("houses deleted");
// 		House.create(houseList, function (err, houses) {
// 			if (err) {
// 				console.log("error creating new user:", err);
// 				process.exit();
// 				mongoose.connection.close();
// 			} else {
// 			console.log('Houses reseeded');		
// 			console.log("first user in house:", houses[0].users[0].name);
// 		}
// 	});
// 	}
// });