var express = require('express'),
		router = express.Router(),
		path = require('path'),
		app = express(),
		bodyParser = require('body-parser'),
		hbs = require('hbs'),
		mongoose = require('mongoose'), 
		apiController = require('../controllers/apiController'),
		houseController = require('../controllers/houseController'),
		userController = require('../controllers/userController');


router.route('/api')
	.get(apiController.index);

router.route('/api/users')
	.get(userController.index);

router.route('/api/users/:id')
	.get(userController.showUser)
	.delete(userController.deleteUser);



router.route('/api/houses')
	.get(houseController.index);

module.exports = router;