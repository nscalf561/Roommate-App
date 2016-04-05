angular.module('household.controller', ['ionic'])

.controller('HouseholdCtrl', function($rootScope, $scope, $ionicModal, $ionicPopup, $http) {

	var self = this;
	self.all = [];
	self.newHouse = {};

	$scope.houses = self.all;

	$scope.households = [
		{name: "The Monastery", address: "2335 Warring St, Berkeley CA"},
		{name: "GA Headquarters", address: "225 Bush St, San Francisco CA"}
	];


	$scope.getHouseholds = function () {
		$http
			.get('http://localhost:3000/api/households')
			.then(function(err, res) {
				if (err) {
					console.log('error', err);
				} else {
					self.all = res.data.houses;
				}
			});
	};


	$scope.createHousehold = function (newHousehold) {
		if (!newHousehold) {
			$scope.showHouseholdNameAlert();
		} else if (!newHousehold.name) {
			$scope.showHouseholdNameAlert();
		} else if (!newHousehold.address) {
			$scope.showAddressAlert();
		}
		console.log('Need to build functionality to create household and add current user to it.', newHousehold);
	};



	$scope.joinHousehold = function (household) {
		console.log(household);
		var houseAndUserId = {
				userId : $rootScope.userId,
				houseId : $rootScope.houseId
			};
		$http
			.post('http://localhost:3000/api/houseuser')
			.then(function(err, res) {
				if (err) {
					console.log("Error:", err);
				} else {
					res.json(houseAndUserId);
				}
			});
	};
	


	//Popup alert if user has not filled out all portions of the new household form
	$scope.showAddressAlert = function() {
	  var alertPopup = $ionicPopup.alert({
	  	title: 'Could not create household',
	  	template: 'Must include a household address.'
	 	});

	 	alertPopup.then(function(res) {
	   	console.log('redirected user back to new household form');
	 	});
	};

	$scope.showHouseholdNameAlert = function() {
	  var alertPopup = $ionicPopup.alert({
	  	title: 'Could not create household',
	  	template: 'Must include a household name.'
	 	});

	 	alertPopup.then(function(res) {
	   	console.log('redirected user back to new household form');
	 	});
	};

	// New Household Modal Functions
  // Creates and loads the new household modal
  $ionicModal.fromTemplateUrl('new-household.html', function(modal) {
    $scope.householdModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up' //look at this later
  });

  //opens the new message modal
  $scope.showNewHouseholdModal = function() {
    $scope.householdModal.show();
  };

  //closes the new message modal
  $scope.closeNewHouseholdModal = function() {
    $scope.householdModal.hide();
  };
});