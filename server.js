var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		hbs = require('hbs'),
		mongoose = require('mongoose');

// configures bodyParser (accepts form data)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// serves static files from public folder
app.use(express.static(__dirname + '/public'));

// sets view engine to hbs, angular will be on the front
app.set('view engine', 'hbs');

// connect to mongo for our database
mongoose.connect('mongodb://localhost');

var user = require('./models/user.js');
var house = require('./models/house.js');


app.get('*', function(req, res) {
	console.log('getting route');
	res.render('index');
});




// running on port 3000s
app.listen(3000, function(){
	console.log('server is up');
});

