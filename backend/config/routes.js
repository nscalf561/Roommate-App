var express                = require('express'),
	router                 = express.Router(),
	path                   = require('path'),
	app                    = express(),
	bodyParser             = require('body-parser'),
	hbs                    = require('hbs'),
	mongoose               = require('mongoose'), 
	apiController          = require('../controllers/apiController'),
	houseController        = require('../controllers/houseController'),
	userController         = require('../controllers/userController'),
	choreController        = require('../controllers/choreController'),
	announcementController = require('../controllers/announcementController'),
	supplyController       = require('../controllers/supplyController'),
	sessionsController     = require('../controllers/sessionsController'),
	HouseUser			   = mongoose.model('HouseUser'),
	User                   = mongoose.model('User');


// API directory
router.route('/api')
	.get(apiController.index);

// Registration
router.route('/api/signup')
  .post(sessionsController.signup);

// route to authenticate a user 
router.route('/api/authenticate')
  .post(sessionsController.authenticate);

// route to a restricted info 
// router.route('/api/memberinfo')
//   .get(sessionsController.memberinfo);

// API Users
router.route('/api/users')
	.get(userController.index);

// API Individual User
router.route('/api/users/:id')
	.get(userController.showUser)
  .put(userController.updateUser)
	// .put(sessionsController.addUserHouse)
	.delete(userController.deleteUser);

// API Household
router.route('/api/households')
	.get(houseController.index)
	.post(houseController.createHouse);

// API Individal Household
router.route('/api/households/:hid')
	.get(houseController.showHouse)
	.delete(houseController.deleteHouse)
	.put(houseController.updateHouse);

// API Chores
router.route('/api/households/:hid/chores')
  .get(choreController.index)
  .post(choreController.createChore);

// API Individual Chore
router.route('/api/households/:hid/chores/:id')
  .get(choreController.showChore)
  .delete(choreController.deleteChore);
// .put(choreController.updateChore);


// API Announcements
router.route('/api/households/:hid/announcements')
  .get(announcementController.index)
  .post(announcementController.createAnnouncement);

// API Individual Announcement
router.route('/api/households/:hid/announcements/:id')
  .get(announcementController.showAnnouncement)
  .delete(announcementController.deleteAnnouncement);

// API Supplies
router.route('/api/households/:hid/supplies')
  .get(supplyController.index)
  .post(supplyController.createSupply);

// API Individual Supply
router.route('/api/households/:hid/supplies/:id')
  .get(supplyController.showSupply)
  .delete(supplyController.deleteSupply);

// API HouseUser
router.route('/api/houseuser')
	.get(houseuserController.showHouseUser)
	.post(houseuserController.joinHouse);



module.exports = router;