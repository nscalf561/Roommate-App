angular.module('household.controller', ['ionic'])

.controller('HouseholdCtrl', function($scope, $ionicModal, $ionicPopup, $http) {

	$scope.households = [
		{name: "The Monastery", address: "2335 Warring St, Berkeley CA"},
		{name: "GA Headquarters", address: "225 Bush St, San Francisco CA"}
	];


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
		console.log('Build functionality to have user join ', household);
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