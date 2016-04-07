angular.module('supply.controller', ['ionic'])

.controller('SupplyCtrl', function($scope, $ionicModal, $ionicPopup, $http, $timeout, AuthService) {
  
  var payload = AuthService.jwtToJSON();
  getSupplies();

  $scope.supplies = [];

  function getSupplies() {
    $http
      .get('http://localhost:3000/api/households/' + payload.households[0] + '/supplies')
      .then(function(res){
        console.log("get supplies", res.data.supplies);
          $scope.supplies = (res.data.supplies);
      });
  }

  $scope.createSupply = function(newSupply) {
    if (!newSupply) {
      $scope.showFailToAddChoreAlert();
      return;
    } else {
      var supply = {
        item: newSupply.item,
        completedAt: new Date(),
        purchasedBy: newSupply.purchasedBy
      };

      newSupply.item = '';

      $http
        .post('http://localhost:3000/api/households/' + payload.households[0] + '/supplies', supply)
        .then(function(res) {
          console.log('added new supply:', supply);
          getSupplies();
          $scope.closeNewSupplyModal();
        });
    }
  };

  $scope.deleteSupply = function (supply) {
    console.log(supply);
    console.log('we will delete this supply');
    $http
      .delete('http://localhost:3000/api/households/' + payload.households[0] + '/supplies/' + supply._id)
      .then(function(res) {
        console.log('Supply deleted');
        getSupplies();
      });
  };


  // New Supply Modal Functions
  $ionicModal.fromTemplateUrl('new-supply.html', function(modal) {
    $scope.supplyModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up' //look at this later
  });

  //opens the new supply modal
  $scope.showNewSupplyModal = function() {
    $scope.supplyModal.show();
  };

  //closes the new supply modal
  $scope.closeNewSupplyModal = function() {
    $scope.supplyModal.hide();
  };


  //Popup alert if user has not filled out the new supply form
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