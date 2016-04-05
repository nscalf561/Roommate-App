angular.module('chore.controller', ['ionic'])

.controller('ChoreCtrl', function($scope, $ionicModal, $http, $timeout) {

  var self = this;
  self.all = [];
  // self.addChore = addChore;
  self.newChore = {};
  // self.deleteChore = deleteChore;

  getChores();

  $scope.chores = self.all;


  function getChores() {
  	$http
  		.get('http://localhost:3000/api/households/5703066c1d3b3865b8727c11/chores')
  		.then(function(res){
				self.all = res.data.chores;
  		});
  }



	// New Chore Modal Functions
  // Creates and loads the new chore modal
  $ionicModal.fromTemplateUrl('new-chore.html', function(modal) {
    $scope.choreModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up' //look at this later
  });

  //opens the new message modal
  $scope.showNewChoreModal = function() {
    $scope.choreModal.show();
  };

  //closes the new message modal
  $scope.closeNewChoreModal = function() {
    $scope.choreModal.hide();
  };



});