var mongoose 	= require('mongoose');
var User 		= require('../models/user');
var House 		= require('../models/house');
var HouseUser 	= require('../models/houseUser');

mongoose.connect('mongodb://localhost/project4');


// remove all existing users and houses from db
User.remove({}, function(err, users){
	if (err) {
		console.log("error removing users:", err);
		process.exit();
		mongoose.connection.close();
	} else {
		console.log("users deleted");
	}
});
House.remove({}, function(err, houses){
	if (err) {
		console.log("error removing houses:", err);
		process.exit();
		mongoose.connection.close();
	} else {
		console.log("houses deleted");
	}
});
// clear HouseUser join table
HouseUser.remove({}, function(err, houseUsers){
	if (err) {
		console.log("error clearing houseUser join table:", err);
		process.exit();
		mongoose.connection.close();
	} else {
		console.log("houseUser join table cleared");
	}
});


// create list of users to be seeded
var userList = [
	{
		name: {
			type: "Jessie",
		},
		password: {}// TODO
	},
	{
		name: {
			type: "Jessie",
		},
		password: {}// TODO
	}
];


// create above list of users
User.create(userList, function(err, users) {
	console.log("users created", users);

	// create list of houses to be seeded
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

	var house 	= new House(houseList);
	var house1 	= house;
	var user1 	= users[0];
	var user2 	= users[1];

	// move users into designated households
	house1.users.push(users[0]);
	house1.users.push(users[1]);
	console.log(house1.users);

	// save 
	house.save(function(err, house) {
	console.log(house);
	});	

});

