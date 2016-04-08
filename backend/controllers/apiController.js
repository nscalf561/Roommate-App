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
      {method: "PUT", path: "/api/users/:id", description: "Update an individual user"},
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
      {method: "PUT", path: "/api/households/:hid/chores/:id", description: "Update an individual chore"},   
      {method: "DELETE", path: "/api/households/:hid/chores/:id", description: "Delete an individual chore"},      
      
      //supply endpoints
      {method: "GET", path: "/api/households/:hid/supplies", description: "See a list of all household supplies"},
      {method: "POST", path: "/api/households/:hid/supplies", description: "Create a new supply for a particular household"},
      {method: "GET", path: "/api/households/:hid/supplies/:id", description: "see individual supply details"},
      {method: "DELETE", path: "/api/households/:hid/supplies/:id", description: "Delete an individual supply"},

      //completed chore endpoints
      {method: "GET", path: "/api/households/:hid/completedChores", description: "See a list of all completed household chores"},
      {method: "POST", path: "/api/households/:hid/completedChores", description: "Create a new instance of a completed chore for a particular household"},
      {method: "GET", path: "/api/households/:hid/completedChores/:id", description: "See individual completed chore details"},
      {method: "DELETE", path: "/api/households/:hid/completedChores/:id", description: "Delete an instance of a completed chore"},   
      

      //purchased supply endpoints
      {method: "GET", path: "/api/households/:hid/purchasedSupplies", description: "See a list of all purchased household supplies"},
      {method: "POST", path: "/api/households/:hid/purchasedSupplies", description: "Create a new instance of a purchased supply for a particular household"},
      {method: "GET", path: "/api/households/:hid/purchasedSupplies/:id", description: "See individual purchased supply details"},
      {method: "DELETE", path: "/api/households/:hid/purchasedSupplies/:id", description: "Delete an instance of a purchased supply"},   
      ]
		});
	}

};

module.exports = apiController;