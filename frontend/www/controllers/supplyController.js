angular.module('supply.controller', ['ionic'])

.controller('SupplyCtrl', function($rootScope, $scope, $ionicModal, $ionicPopup, $http, $timeout) {
  
  getSupplies();

  function getSupplies() {
    $http
      .get('http://localhost:3000/api/households/' + $rootScope.houseId + '/supplies')
      .then(function(res){
        console.log("get supplies", res.data.chores);
        // self.all = res.data.chores;
      });
    // $http
    //   .get('http://localhost:3000/api/households/:hid/supplies')
    //   .then(function(res) {
    //       res.data.houses.forEach(function(house){
    //         $scope.households.push(house);
    //       });
    //   });
  }

  $scope.createChore = function(newSupply) {
    // if new chore form field is empty, show popup so user knows they must complete field
    if (!newSupply) {
      $scope.showFailToAddChoreAlert();
      return;
    } else {
      // create new chore object that will be saved to household in database 
      var supply = {
        item: newSupply.item,
        completedAt: new Date(),
        purchasedBy: newSupply.purchasedBy
      };
      // reset chore form to empty
      newSupply.item = '';

      // add the chore to the house model
      $http
        .post('http://localhost:3000/api/households/' + $rootScope.houseId + '/supplies', supply)
        .then(function(res) {
          console.log('added new supply:', supply);
          // push the chore object to the front-end array of chores
          getSupplies();
          // close new chore model
          $scope.closeNewSupplyModal();
        });
    }
  };


  // New Chore Modal Functions
  // Creates and loads the new chore modal
  $ionicModal.fromTemplateUrl('new-supply.html', function(modal) {
    $scope.supplyModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up' //look at this later
  });

  //opens the new message modal
  $scope.showNewSupplyModal = function() {
    $scope.supplyModal.show();
  };

  //closes the new message modal
  $scope.closeNewSupplyModal = function() {
    $scope.supplyModal.hide();
  };


  //Popup alert if user has not filled out the new chore form
  $scope.showFailToAddSupplyAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Could not create supply',
      template: 'Must include a chore description.'
    });

    alertPopup.then(function(res) {
      console.log('redirected user back to new supply form');
    });
  };
});