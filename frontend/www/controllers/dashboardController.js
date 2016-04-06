angular.module('dashboard.controller', ['angularMoment'])

.controller('DashboardCtrl', function($rootScope, $scope, $http, AuthService) {

  var payload = AuthService.jwtToJSON();
  //TODO
  $http
  	.get('http://localhost:3000/api/households/' + $rootScope.payload.households[0])
  	.then(function(res) {
  	   // $scope.supplies = res.data.house[0].supplies;
       var house = res.data.house[0];
  	   $scope.chores = house.chores;
       // $scope.announcements= res.data.house[0].announcements;

      $scope.dashboardContent = [];

      $scope.chores.forEach(function(chore) {
        $scope.dashboardContent.push(chore);
      });
      
    });
});