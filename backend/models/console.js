var db      	= {};
db.House 			= require('./house');
db.User 			= require('./user');
db.HouseUser 	= require('./houseUser');


var repl = require('repl');


repl.start('> ').context.db = db;