var app = require('../server.js');

var apiController = {

	index: function (req, res) {
		res.json({
			message: "You made it to the api!",
   	 	documentation_url: "https://github.com/nscalf561/Roommate-App.git",
    	base_url: "TBD",
    	endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/users", description: "See a list of all users"},
      {method: "GET", path: "/api/users/:id", description: "See individual user details"},
      {method: "DELETE", path: "/api/users/:id", description: "Delete an individual user"},
      {method: "GET", path: "/api/households", description: "See a list of all households"},
      {method: "GET", path: "/api/households/:id", description: "See individual household details"},
      {method: "DELETE", path: "/api/households/:id", description: "Delete an individual household"},
      {method: "PUT", path: "/api/households/:id", description: "Edit individual household details"},
      ]
		});
	}

};

module.exports = apiController;