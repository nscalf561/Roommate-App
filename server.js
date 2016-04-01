var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose');

// TODO
app.engine('html', require('ejs').renderFile);

// configures bodyParser (accepts form data)
app.use(bodyParser.urlencoded({extended: true}));

// serves static files from public folder
app.use(express.static(__dirname + '/public'));

// since we're using Angular on the front end, we're using html engine
app.set('view engine', 'html');

// TODO
mongoose.connect('mongodb://localhost');

// running on port 3000
app.listen(3000, function(){
	console.log('server is up');
});

