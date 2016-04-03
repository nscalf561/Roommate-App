var express = require('express'),
		router = express.Router(),
		path = require('path'),
		app = express(),
		bodyParser = require('body-parser'),
		hbs = require('hbs'),
		mongoose = require('mongoose'), 
		apiController = require('../controllers/apiController'),
		houseController = require('../controllers/houseController'),
		userController = require('../controllers/userController'),
		choreController = require('../controllers/choreController');

// API directory
router.route('/api')
	.get(apiController.index);

// API Users
router.route('/api/users')
	.get(userController.index);

// API Individual User
router.route('/api/users/:id')
	.get(userController.showUser)
	.delete(userController.deleteUser);

// API Household
router.route('/api/households')
	.get(houseController.index)
	.post(houseController.createHouse);

// API Individal Household
router.route('/api/households/:id')
	.get(houseController.showHouse)
	.delete(houseController.deleteHouse)
	.put(houseController.updateHouse);

// API Chores
router.route('/api/households/:id/chores')
.get(choreController.index)
.post(choreController.createChore);

// API Individual Chore
router.route('/api/households/:hid/chores/:id')
.get(choreController.showChore)
.delete(choreController.deleteChore);
// .put(choreController.updateChore);

module.exports = router;