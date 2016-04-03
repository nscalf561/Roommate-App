var User = require('../models/User');
var House = require('../models/House');
// var Chore = require('../models/Chore');
// var HouseUser = require('../models/HouseUser');
// var HouseChore = require('../models/HouseChore');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project4');
// console.log("connected to db");

User.remove({}, function(err, users){});
House.remove({}, function(err, houses){});

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
console.log("outside user list");
User.create(userList, function(err, users) {
	console.log("users created", users);
	
	var houseList = 
		{
			name: "Monastery",
			address: "2335 Warring St, Berkeley, CA",
			users: [],
			chores: [{
				task: "clean this thing",
				isCompleted: false,
				upvotes: 1,
				completedBy: "Jessie"
			}]
		};
	console.log('about ot make houses');
	//create house

	var house = new House(houseList);
		var house1 = house;
		var user1 = users[0];
		var user2 = users[1];


		house1.users.push(users[0]);
		house1.users.push(users[1]);
		console.log(house1.users);

	house.save(function(err, house) {
		console.log(house);
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