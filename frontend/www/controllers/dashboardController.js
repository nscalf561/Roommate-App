angular.module('dashboard.controller', ['angularMoment'])

.controller('DashboardCtrl', function($scope, $http, AuthService) {

var payload = AuthService.jwtToJSON();
//TODO
  $http
  	.get('http://localhost:3000/api/households/' + payload.households[0])
  	.then(function(res) {
  	   // $scope.supplies = res.data.house[0].supplies;
  	   $scope.chores = res.data.house[0].chores;
  	   $scope.announcements= res.data.house[0].announcements;
  	});

  // $scope.dashboardContent = [
  //   { title: 'Clean Kitchen', completedBy: 'Caleb', date: 'April 3, 2016', id: 1 },
  //   { title: 'Please pick up laundry detergent!', author: 'Jessie', date: 'April 2, 2016', id: 2 },
  //   { title: 'Clean the toilet', completedBy: 'Nick', date: 'April 1, 2016', id: 3 },
  //   { title: 'Seriously Nick, clean the toilet', author: 'Caleb', date: 'April 1, 2016', id: 4 },
  //   { title: 'Take out trash', completedBy: 'Caleb', date: 'March 29, 2016', id: 5 },
  //   { title: 'Will do dishes when I get home!!! Sorry', author: 'Jessie', date: 'March 27, 2016', id: 6 },
  // ];
});