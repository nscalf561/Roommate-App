angular.module('household.controller', ['ionic'])

.controller('HouseholdCtrl', function(AuthService, $scope, $ionicModal, $ionicPopup, $http, $state) {

	$scope.households = [];

	// get all houses with initial load of template
	getHouseholds();

	function getHouseholds() {
		$http
			.get('http://localhost:3000/api/households')
			.then(function(res) {
					res.data.houses.forEach(function(house){
						$scope.households.push(house);
					});
			});
	}

	$scope.createHousehold = function (newHousehold) {
		if (!newHousehold) {
			return $scope.showHouseholdNameAlert();
		} else if (!newHousehold.name) {
			return $scope.showHouseholdNameAlert();
		} else if (!newHousehold.address) {
			return $scope.showAddressAlert();
		}
		
		var newHouse = {
			name: newHousehold.name,
			address: newHousehold.address
		};

		$http
			.post('http://localhost:3000/api/households', newHouse)
			.then(function(res) {
				console.log(newHouse);
  				getHouseholds();
			});
	};

	$scope.joinHousehold = function (household) {

		var payload = AuthService.jwtToJSON();
		var houseAndUserId = {
				userId : payload._id,
				houseId : household._id
			};



		$http
			.post('http://localhost:3000/api/houseuser', houseAndUserId)
			.then(function(res) {
				console.log(houseAndUserId);
				$state.go('app.dashboard');
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