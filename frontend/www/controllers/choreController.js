angular.module('chore.controller', ['ionic'])

.controller('ChoreCtrl', function($rootScope, $scope, $ionicModal, $ionicPopup, $http, $timeout) {

  var self = this;
  self.all = [];
  self.newChore = {};

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
      $scope.showFailToAddChoreAlert();
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
          getChores();
          // close new chore model
          $scope.closeNewChoreModal();
        });
    }
  };


  // increment upvote function
  $scope.incrementUpvote = function(chore) {

    // create new object containing ID of user who is upvoting/downvoting
    var choreInfo = {
      userWhoUpvoted: $rootScope.userId
    };

    // save new chore object in database
    $http
      .put('http://localhost:3000/api/households/' + $rootScope.houseId + '/chores/' + chore._id, choreInfo)
      .then(function(res) {
        console.log('edited chore upvotes');
        getChores();
      });
  };

  // mark a chore completed
  $scope.markCompleted = function (chore) {

    // create an object to send to householdHistory
    var archivedChore = {
      task: chore.task,
      completedAt: new Date(),
      completedByName: $rootScope.userName,
      completedById: $rootScope.userId
    };

    // create an object to reset active chore in house db
    var resetChore = {
      // clear out comments array
      comments: [],
      // clear out upvotes array
      upvotes: "0",
      // reset completed by date
      completedAt: new Date(),
    };

    // make call to backend to reset chore details
    $http
      .put('http://localhost:3000/api/households/' + $rootScope.houseId + '/chores/' + chore._id, resetChore)
      .then(function(res) {
        console.log('reset chore details');
        getChores();
      });
      
    // make call to backend to archive completed chore (for dashboard and data visualization)
    $http
      .post('http://localhost:3000/api/households/' + $rootScope.houseId + '/completedChores/', archivedChore)
      .then(function(res) {
        console.log('Archived the chore');
      });
  };



  $scope.deleteChore = function (chore) {
    $http
      .delete('http://localhost:3000/api/households/' + $rootScope.houseId + '/chores/' + chore._id)
      .then(function(res) {
        console.log('THIS IS A TEST');
        getChores();
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
  $scope.showFailToAddChoreAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Could not create chore',
      template: 'Must include a chore description.'
    });

    alertPopup.then(function(res) {
      console.log('redirected user back to new chore form');
    });
  };


});