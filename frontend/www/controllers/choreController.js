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
    // if the user has not already upvoted the chore, they can increment the upvote count
    if (chore.upvotedBy.indexOf($rootScope.userId) === -1) {

      var whoUpvoted = chore.upvotedBy;
      whoUpvoted.push($rootScope.userId.toString());

      // create new object where upvotes is incremented by 1 and user is added to upvotedBy array
      var incrementedChore = {
        upvotes: chore.upvotes += 1,
        upvotedBy: whoUpvoted
      };

      // save new chore object in database
      $http
        .put('http://localhost:3000/api/households/' + $rootScope.houseId + '/chores/' + chore._id, incrementedChore)
        .then(function(res) {
          console.log('added upvote to chore');
        });
      // if user has already upvoted the chore, decrement upvotes by 1 and user is removed from upvotedBy array
    } else {
        var upvotedList = chore.upvotedBy;
        var indexOfUser = upvotedList.indexOf($rootScope.userId);
        upvotedList.splice(indexOfUser, 1);

        var decrementedChore = {
          upvotes: chore.upvotes -= 1,
          upvotedBy: upvotedList
        };

      $http
      .put('http://localhost:3000/api/households/' + $rootScope.houseId + '/chores/' + chore._id, decrementedChore)
      .then(function(res) {
        console.log('subtracted upvote from chore');
      });
    }
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

    // TODO: make call to backend to store archivedChore details

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