var express 		= require('express'),
	app 			= express(),
	bodyParser  	= require('body-parser'),
	hbs 			= require('hbs'),
	mongoose 		= require('mongoose'), 
	apiController 	= require('./controllers/apiController'),
	passport		= require('passport'),
	config 			= require('./config/database'),
	jwt				= require('jwt-simple');
	routes 			= require('./config/routes');


// configures bodyParser (accepts form data)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//log to console
app.use(morgan('dev'));

//use the passport package in our application
app.use(passport.initialie());

// serves static files from public folder
app.use(express.static(__dirname + '/public'));

// sets view engine to hbs, angular will be on the front
app.set('view engine', 'hbs');

// connect to mongo for our database
mongoose.connect('mongodb://localhost/project4');

// var User = require('./models/user.js');
// var House = require('./models/house.js');

app.use(routes);
// running on port 3000s
app.listen(3000, function(){
	console.log('server is up');
});