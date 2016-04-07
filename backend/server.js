var express 		= require('express'),
	app 			= express(),
	bodyParser  	= require('body-parser'),
	hbs 			= require('hbs'),
	mongoose 		= require('mongoose'), 
	apiController 	= require('./controllers/apiController'),
	passport		= require('passport'),
	config 			= require('./config/database'),
	jwt				= require('jwt-simple'),
	morgan			= require('morgan'),
	cors 			= require('cors'),
	routes 			= require('./config/routes');

// Allows for cross origin resource sharing, THIS MUST BE ON TOP
app.use(cors());

// configures bodyParser (accepts form data)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//log to console
app.use(morgan('dev'));

//use the passport package in our application
app.use(passport.initialize());

// serves static files from public folder
app.use(express.static(__dirname + '/public'));

// sets view engine to hbs, angular will be on the front
app.set('view engine', 'hbs');

// connect to mongo for our database
mongoose.connect(config.database);

//pass passort for configuration
require('./config/passport')(passport);

app.use(routes);
// running on port 3000s
app.listen(3000, function(){
	console.log('server is up');
});