var app = require('../server');

var apiController = {

	index: function (req, res) {
		res.json({
			message: "You made it to the api!",
   	 	documentation_url: "https://github.com/nscalf561/Roommate-App.git",
    	base_url: "TBD",
    	endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},

      //user endpoints
      {method: "GET", path: "/api/users", description: "See a list of all users"},
      {method: "GET", path: "/api/users/:id", description: "See individual user details"},
      {method: "DELETE", path: "/api/users/:id", description: "Delete an individual user"},

      //household endpoints
      {method: "GET", path: "/api/households", description: "See a list of all households"},
      {method: "POST", path: "/api/households", description: "Create a new household"},
      {method: "GET", path: "/api/households/:hid", description: "See individual household details"},
      {method: "DELETE", path: "/api/households/:hid", description: "Delete an individual household"},
      {method: "PUT", path: "/api/households/:hid", description: "Edit individual household details"},

      //announcement endpoints
      {method: "GET", path: "/api/households/:hid/announcements", description: "See a list of all household announcements"},
      {method: "POST", path: "/api/households/:hid/announcements", description: "Create a new announcement for a particular household"},
      {method: "GET", path: "/api/households/:hid/announcements/:id", description: "see individual announcement details"},
      {method: "DELETE", path: "/api/households/:hid/announcements/:id", description: "Delete an individual announcement"},

      //chore endpoints
      {method: "GET", path: "/api/households/:hid/chores", description: "See a list of all household chores"},
      {method: "POST", path: "/api/households/:hid/chores", description: "Create a new chore for a particular household"},
      {method: "GET", path: "/api/households/:hid/chores/:id", description: "see individual chore details"},
      {method: "DELETE", path: "/api/households/:hid/chores/:id", description: "Delete an individual chore"}      
      ]
		});
	}

};

module.exports = apiController;