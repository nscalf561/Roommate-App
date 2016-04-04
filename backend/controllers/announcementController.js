var app = require('../server');

var House = require('../models/House');

var announcementController = {

	// Show all announcements
	index : function (req, res) {
		House.findOne({_id: req.params.hid}, function(err, house) {
			console.log(house);
			if (err) {
				console.log("error has occurred finding the house", err);
			} else {
				res.json({announcements: house.announcements});
			}
		});
	},

	// Create a new announcement
	createAnnouncement : function (req, res) {
		
		// House that we're adding the chore to
		House.findOne({_id: req.params.hid}, function(err, house) {
			if (err) {
				console.log("An error has occurred while finding the house:", err);
			} else {

				// Object we're going to save to db
				var newAnnouncement = {
					content: req.body.content, 
					author: "test", //need to get this from the jwt
					createdAt: new Date()
				};

				// Saves the above object
				house.announcements.push(newAnnouncement);

				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the announcement to the house:", err);
					} else {
						console.log(house);
						res.json({announcements: house.announcements});
					}
				});

			}
		});		
	},

	showAnnouncement : function (req, res) {

		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.announcements.forEach(function(announcement) {
					if (announcement._id == req.params.id) {
						return res.json({announcement: announcement});
					}
				});
				res.json(500).send();
			}
		});

	},

	deleteAnnouncement : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.announcements.forEach(function(announcement) {
					if (announcement._id == req.params.id) {
						console.log(announcement._id);
						var indexOfAnnouncement = house.announcements.indexOf(announcement);
						house.announcements.splice(indexOfAnnouncement, 1);
					}
				});

				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the updated house.announcements array:", err);
					} else {
						console.log(house);
						res.status(400).send();
					}
				});

			}
		});
	}
};

module.exports = announcementController;