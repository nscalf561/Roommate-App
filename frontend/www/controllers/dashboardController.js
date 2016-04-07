angular.module('dashboard.controller', ['angularMoment'])

.controller('DashboardCtrl', function($rootScope, $scope, $http, AuthService) {

  var payload = AuthService.jwtToJSON();
  //TODO
  // console.log("rootscope in dashboard controller", $rootScope);
  $http
  	.get('http://localhost:3000/api/households/' + $rootScope.houseId)
  	.then(function(res) {
      // console.log("res from household call", res);
  	   // $scope.supplies = res.data.house[0].supplies;
       // console.log(res.data)
       var house = res.data.house;
       // console.log("house:", house);
       // console.log(res.data)
  	   $scope.chores = house.chores;
       // $scope.announcements= res.data.house[0].announcements;

      $scope.dashboardContent = [];

      $scope.chores.forEach(function(chore) {
        $scope.dashboardContent.push(chore);
      });
      
    });
});