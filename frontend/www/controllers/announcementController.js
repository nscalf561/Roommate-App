angular.module('announcement.controller', ['ionic'])

.controller('AnnouncementCtrl', function($scope, $ionicModal, $ionicPopup, $http) {

$scope.announcements = [
	{
		author: 'Jessie',
		content: 'need TP',
		createdAt: 'April 3, 2016'
	},
	{
		author: 'Nick',
		content: 'who drank my beer?',
		createdAt: 'April 2, 2016'
	},
	{
		author: 'Jessie',
		content: 'CALEB TURN OFF YOUR MUSIC RIGHT NOW',
		createdAt: 'March 29, 2016'
	}
];


$scope.createAnnouncement = function(newAnnouncement) {
	console.log('will eventually add new announcement', newAnnouncement);
};

	// New Announcement Modal Functions
  // Creates and loads the new announcement modal
  $ionicModal.fromTemplateUrl('new-announcement.html', function(modal) {
    $scope.announcementModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up' //look at this later
  });

  //opens the new announcement modal
  $scope.showNewAnnouncementModal = function() {
    $scope.announcementModal.show();
  };

  //closes the new message modal
  $scope.closeNewAnnouncementModal = function() {
    $scope.announcementModal.hide();
  };



});