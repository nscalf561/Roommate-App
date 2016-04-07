angular.module('announcement.controller', ['ionic'])

.controller('AnnouncementCtrl', function(AuthService, $scope, $ionicModal, $ionicPopup, $http) {

	var self = this;
  self.all = [];

	getAnnouncements();

  var payload = AuthService.jwtToJSON();

	function getAnnouncements() {
		 $http
  		.get('http://localhost:3000/api/households/' + payload.households[0] + '/announcements')
  		.then(function(res){
				$scope.announcements = res.data.announcements;
  		});
	}



	$scope.createAnnouncement = function(newAnnouncement) {
    if (!newAnnouncement) {
      return $scope.showFailToAddAnnouncementAlert();
    }

    // create new announcement object to pass to the backend
		var announcement = {
			content: newAnnouncement.content,
			userName: payload.name,
			userId: payload._id,
			createdAt: new Date()
		};

		// reset the announcement form to empty
		newAnnouncement.content = '';

		// add the announcement to the house model
    $http
      .post('http://localhost:3000/api/households/' + payload.households[0] + '/announcements', announcement)
      .then(function(res) {
        console.log('added new announcement:', announcement);
        getAnnouncements();
        // close new chore model
        $scope.closeNewAnnouncementModal();
      });		
	};

  $scope.deleteAnnouncement = function (announcement) {
  $http
    .delete('http://localhost:3000/api/households/' + payload.households[0] + '/announcements/' + announcement._id)
    .then(function(res) {
      console.log('Announcement deleted');
      getAnnouncements();
    });
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


  //Popup alert if user has not filled out the new announcement form
  $scope.showFailToAddAnnouncementAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Could not create announcement',
      template: 'Must include an announcement description!'
    });

    alertPopup.then(function(res) {
      console.log('redirected user back to new announcement form');
    });
  };


});