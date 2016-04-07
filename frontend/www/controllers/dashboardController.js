angular.module('dashboard.controller', ['angularMoment'])

.controller('DashboardCtrl', function($scope, $http, AuthService) {

  var payload = AuthService.jwtToJSON();

  // makes the controller re-render info from the household upon entering the dashboard
  $scope.$on('$ionicView.enter', function() {
    getHouseholds();
  });

  // this will get all of the data stored in the household to append to the page
  function getHouseholds() {
    $http
      .get('http://localhost:3000/api/households/' + payload.households[0])
      .then(function(res) {

        var house = res.data.house;
        $scope.houseName = res.data.house.name;
        
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
          house.completedChores.forEach(function(completedChore) {
            $scope.dashboardContent.push(completedChore);
          });
        }

        // organizes the dashboard so that the newest content is on the top
        var organizedDashboard = $scope.dashboardContent.sort(function(a, b) {
          if ((a.completedAt || a.createdAt || a.createAt) > (b.completedAt || b.createdAt || b.createAt)) {
            return -1;
          } else {
            return 1;
          }
        });

        $scope.dashboardContent = organizedDashboard;


      });
    }
});