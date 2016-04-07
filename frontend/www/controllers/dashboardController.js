angular.module('dashboard.controller', ['angularMoment'])

.controller('DashboardCtrl', function($scope, $http, AuthService) {

  var payload = AuthService.jwtToJSON();

  $scope.$on('$ionicView.enter', function() {
    getHouseholds();
    });


  function getHouseholds() {
    $http
      .get('http://localhost:3000/api/households/' + payload.households[0])
      .then(function(res) {

        var house = res.data.house;
        
        $scope.dashboardContent = [];

        // this will push all of the data we need to sort into Dashboard Content
        if (house !== undefined && house.chores !== undefined) {
          house.chores.forEach(function(chore) {
            $scope.dashboardContent.push(chore);
          });
          house.announcements.forEach(function(announcement) {
            $scope.dashboardContent.push(announcement);
          });
          house.supplies.forEach(function(supply) {
            $scope.dashboardContent.push(supply);
          });
        }
      });
    }
});