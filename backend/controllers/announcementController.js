var app 	= require('../server');
var House 	= require('../models/house');


var announcementController = {

	// show all announcements
	index : function (req, res) {
		House.findOne({_id: req.params.hid}, function(err, house) {
			if (err) {
				console.log("error has occurred finding the house", err);
			} else {
				res.json({announcements: house.announcements});
			}
		});
	},


	// create a new announcement
	createAnnouncement : function (req, res) {
		// find the house that we're adding the chore to
		House.findOne({_id: req.params.hid}, function(err, house) {
			if (err) {
				console.log("An error has occurred while finding the house:", err);
			} else {

				// object we're going to save to db
				var newAnnouncement = {
					content: req.body.content, 
					userName: req.body.userName,
					userId: req.body.userId,
					createdAt: req.body.createdAt
				};

				// saves the above object
				house.announcements.push(newAnnouncement);
				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the announcement to the house:", err);
					} else {
						res.json({announcements: house.announcements});
					}
				});
			}
		});		
	},


	// show an individual announcement
	showAnnouncement : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {
				house.announcements.forEach(function(announcement) {
					if (announcement._id == req.params.id) {
						return res.json({announcement: announcement});
					} else {
						res.json(500).send();
					}
				});
			}
		});
	},


	// delete an individual announcement
	deleteAnnouncement : function (req, res) {
		House.findOne({_id: req.params.hid}, function (err, house) {
			if (err) {
				res.status(500).send();
				console.log("An error has occurred while finding the house:", err);
			} else {

				// find the nested announcement we want to delete and remove it from the house
				house.announcements.forEach(function(announcement) {
					if (announcement._id == req.params.id) {
						var indexOfAnnouncement = house.announcements.indexOf(announcement);
						house.announcements.splice(indexOfAnnouncement, 1);
					}
				});

				// save these changes to the house so they persist in the database
				house.save(function(err, house) {
					if (err) {
						console.log("There was an error saving the updated house.announcements array:", err);
					} else {
						res.json({house: house});
					}
				});
			}
		});
	}
};

module.exports = announcementController;