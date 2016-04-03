var User = require('../models/User');
var House = require('../models/House');
var Chore = require('../models/Chore');
var HouseUser = require('../models/HouseUser');
var HouseChore = require('../models/HouseChore');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project4');
// console.log("connected to db");

User.remove({}, function(err, users){});
House.remove({}, function(err, houses){});
Chore.remove({}, function(err, chores){});
HouseUser.remove({}, function(err, houseUsers){});
HouseChore.remove({}, function(err, housesChores){});

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
			address: "2335 Warring St, Berkeley, CA"
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
			if (err) {
				console.log("m2m association could not be made:", err);
			} else {
			console.log("m2m association made", houseUsers);
			mongoose.disconnect();
			}
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