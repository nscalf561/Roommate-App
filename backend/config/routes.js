var express           = require('express'),
		router            = express.Router(),
		path              = require('path'),
		app               = express(),
		bodyParser        = require('body-parser'),
		hbs               = require('hbs'),
		mongoose          = require('mongoose'), 
		apiController     = require('../controllers/apiController'),
		houseController   = require('../controllers/houseController'),
		userController    = require('../controllers/userController'),
		choreController   = require('../controllers/choreController'),
    announcementController = require('../controllers/announcementController'),
		passport          = require('passport'),
		jwt	              = require('jwt-simple'),
		config            = require('./database'),
		User              = mongoose.model('User');


// API directory
router.route('/api')
	.get(apiController.index);

// Registration
router.post('/api/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password,
      households: req.body.households || ""
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

// route to authenticate a user (POST http://localhost:3000/api/authenticate)
router.post('/api/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// route to a restricted info (GET http://localhost:3000/api/memberinfo)
// router.get('/api/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
//   var token = getToken(req.headers);
//   if (token) {
//     var decoded = jwt.decode(token, config.secret);
//     User.findOne({
//       name: decoded.name
//     }, function(err, user) {
//         if (err) throw err;
 
//         if (!user) {
//           return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
//         } else {
//           res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
//         }
//     });
//   } else {
//     return res.status(403).send({success: false, msg: 'No token provided.'});
//   }
// });
 
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    console.log("AKSJBDJHABDJHASBDJAHSDBASJHLDBAJHDSBA HERE", parted);
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};



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


module.exports = router;