var app = require('../server.js');

var apiController = {

	index: function (req, res) {
		res.json({
			message: "You made it to the api!",
   	 	documentation_url: "https://github.com/nscalf561/Roommate-App.git",
    	base_url: "TBD",
    	endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
      ]
		});
	}

};

module.exports = apiController;