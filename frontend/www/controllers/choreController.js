angular.module('chore.controller', ['ionic'])

.controller('ChoreCtrl', function($rootScope, $scope, $ionicModal, $ionicPopup, $http, $timeout) {

  var self = this;
  self.all = [];
  self.newChore = {};
  // self.deleteChore = deleteChore;

  getChores();

  $scope.chores = self.all;

  // get all chores
  function getChores() {
  	$http
  		.get('http://localhost:3000/api/households/' + $rootScope.houseId + '/chores')
  		.then(function(res){
        console.log(res.data.chores);
        console.log('userId:', $rootScope.userId);
        console.log('houseId:',$rootScope.houseId);
				self.all = res.data.chores;
  		});
  }


  // create new chore
  $scope.createChore = function(newChore) {
    // if new chore form field is empty, show popup so user knows they must complete field
    if (!newChore) {
      $scope.showChoreAlert();
      return;
    } else {

      // create new chore object that will be saved to household in database 
      var chore = {
        task: newChore.task,
        completedAt: new Date(),
        upvotes: 0
      };
      // reset chore form to empty
      newChore.task = '';

      // add the chore to the house model
      $http
        .post('http://localhost:3000/api/households/' + $rootScope.houseId + '/chores', chore)
        .then(function(res) {
          console.log('added new chore:', chore);
          // push the chore object to the front-end array of chores
          self.all.push(chore);
          // close new chore model
          $scope.closeNewChoreModal();
        });
    }
  };


  // increment upvote function
  $scope.addUpvote = function(chore) {
    // if the user has not already upvoted the chore
    if (chore.upvotedBy.indexOf($rootScope.userId) === -1)
      // console.log(chore.upvotedBy.indexOf($rootScope.userId));

      // create new object where upvotes is incremented by 1 and user is added to upvotedBy array
      var updatedChore = {
        upvotes: chore.upvotes += 1,
        upvotedBy: chore.upvotedBy.push($rootScope.userId)
      };

    // console.log(chore._id);
    // console.log('you upvoted, and here is the current user', $rootScope.userId);

    // save new chore object in database
    $http
      .put('http://localhost:3000/api/households/' + $rootScope.houseId + '/chores/' + chore._id, updatedChore)
      .then(function(res) {
        console.log('added upvote to chore', chore);
      });
  };


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


  //Popup alert if user has not filled out the new chore form
  $scope.showChoreAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Could not create chore',
      template: 'Must include a chore description.'
    });

    alertPopup.then(function(res) {
      console.log('redirected user back to new chore form');
    });
  };

});