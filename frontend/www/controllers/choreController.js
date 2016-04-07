angular.module('chore.controller', ['ionic'])

.controller('ChoreCtrl', function($scope, $ionicModal, $ionicPopup, $http, AuthService) {

  $scope.chores = [];

  var payload = AuthService.jwtToJSON();
  getChores();

  // get all chores
  function getChores() {
  	$http
  		.get('http://localhost:3000/api/households/' + payload.households[0] + '/chores')
  		.then(function(res){
        // console.log(res.data.chores);
        $scope.chores = (res.data.chores);
  		});
  }


  // create new chore
  $scope.createChore = function(newChore) {
    // if new chore form field is empty, show popup so user knows they must complete field
    if (!newChore) {
      return $scope.showFailToAddChoreAlert();
    } else if (!newChore.task) {
      return $scope.showFailToAddChoreAlert();
    } else {

      // create new chore object that will be saved to household in database 
      var chore = {
        task: newChore.task,
        completedAt: new Date(),
        upvotes: 0,
        completedBy: payload.name
      };

      // reset chore form to empty
      newChore.task = '';

      // add the chore to the house model
      $http
        .post('http://localhost:3000/api/households/' + payload.households[0] + '/chores', chore)
        .then(function(res) {
          console.log('added new chore:', chore);
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
      userWhoUpvoted: payload._id
    };


    // save new chore object in database
    $http
      .put('http://localhost:3000/api/households/' + payload.households[0] + '/chores/' + chore._id, choreInfo)
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
      completedByName: payload.name,
      completedById: payload._id
    };

    // create an object to reset active chore in house db
    var resetChore = {
      // clear out comments array
      comments: [],
      // clear out upvotes array
      upvotes: "0",
      // reset completed by date
      completedAt: new Date(),
      upvotedBy: []
    };

    // make call to backend to reset chore details
    $http
      .put('http://localhost:3000/api/households/' + payload.households[0] + '/chores/' + chore._id, resetChore)
      .then(function(res) {
        console.log('reset chore details');
        getChores();
        console.log(res);
      });

    // make call to backend to archive completed chore (for dashboard and data visualization)
    $http
      .post('http://localhost:3000/api/households/' + payload.households[0] + '/completedChores/', archivedChore)
      .then(function(res) {
        console.log('Archived the chore');
      });
  };


  $scope.deleteChore = function (chore) {
    console.log('we will delete this chore');
    $http
      .delete('http://localhost:3000/api/households/' + payload.households[0] + '/chores/' + chore._id)
      .then(function(res) {
        console.log('Chore deleted', res);
        getChores();
      });
  };


  $scope.addComment = function(chore) {
    console.log('new comment function has been reached. comment:', chore.newCommentContent);

    var comment = {
      content: chore.newCommentContent,
      author: payload.name,
      createdAt: new Date()
    };

    $http
      .put('http://localhost:3000/api/households/' + payload.households[0] + '/chores/' + chore._id, comment)
      .then(function(res) {
        getChores();
        chore.comments.push(comment);
        chore.newCommentContent = '';
      });

  };



  // New Chore Modal Functions
  // Creates and loads the new chore modal
   $ionicModal.fromTemplateUrl('new-chore.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.newChoreModal = modal;
      });

  //opens the new message modal
  $scope.showNewChoreModal = function() {
    $scope.newChoreModal.show();
  };

  //closes the new message modal
  $scope.closeNewChoreModal = function() {
    $scope.newChoreModal.hide();
  };


  // Chore Details Modal Functions
  // Creates and loads the chore details modal
   $ionicModal.fromTemplateUrl('chore-details.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.choreDetailsModal = modal;
      });

  //opens the new message modal
  $scope.showChoreDetailsModal = function(chore) {
    $scope.chore = chore;
    $scope.choreDetailsModal.show();
  };

  //closes the new message modal
  $scope.closeChoreDetailsModal = function() {
    $scope.choreDetailsModal.hide();
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