angular.module('chore.controller', ['ionic'])

.controller('ChoreCtrl', function($scope, $ionicModal, $http) {
  // $scope.choreContent = [
  // 	{
		// 	task: 'Clean Kitchen', 
		// 	completedAt: 'April 3, 2016',
		// 	upvotes: 3,
		// 	completedBy: '',
		// 	comments: []
		// },
  // 	{
		// 	task: 'Clean Toilet', 
		// 	completedAt: 'April 2, 2016',
		// 	upvotes: 2,
		// 	completedBy: '',
		// 	comments: [
		// 	{
		// 		author: 'Jessie',
		// 		content: 'no more chipotle for nick'
		// 	}]
		// },
		// {
		// 	task: 'Take out trash', 
		// 	completedAt: 'April 1, 2016',
		// 	upvotes: 1,
		// 	completedBy: '',
		// 	comments: []
		// },
		// {
		// 	task: 'Mop floors', 
		// 	completedAt: 'Mar 23, 2016',
		// 	upvotes: 0,
		// 	completedBy: '',
		// 	comments: []
		// },
		// {
		// 	task: 'Clean Shower', 
		// 	completedAt: 'Mar 2, 2016',
		// 	upvotes: 0,
		// 	completedBy: '',
		// 	comments: []
		// }
  // ];

  var self = this;
  self.all = [];
  // self.addChore = addChore;
  self.newChore = {};
  // self.deleteChore = deleteChore;

  getChores();


  function getChores() {
  	console.log("ABSDJADBAJSDBNAKJSDBAKJSDBASJDB HERE WE ARE");
  	$http
  		.get('http://localhost:3000/api/households/5701867a0f28973d75003de3/chores')
  		.then(function(res){
  			console.log("sdjkfnjdsknfkjsdnfjkds", res);
  			self.all.push(res.data.chores);
  		});
  }



	// New Chore Modal Functions
  // Creates and loads the new message modal
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