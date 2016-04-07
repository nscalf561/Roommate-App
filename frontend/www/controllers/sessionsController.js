angular.module('sessions.controller', ['ionic'])
 
.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  if (AuthService.isAuthenticated() && AuthService.jwtToJSON().households[0]) {
    console.log("authenticated");
    $state.go('app.dashboard');
  }

  $scope.user = {
    name: '',
    password: ''
  };


  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      var payload = AuthService.jwtToJSON();
      if (payload.households.length > 0) {
        $scope.houseId = payload.households[0];
        $scope.userId = payload._id;
        $scope.userName = payload.name;
        $state.go('app.dashboard');
      } else {
        $state.go('app.households');
      }
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})
 
.controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('app.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})
 
.controller('LogoutCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state, $window) {
  $scope.destroySession = function() {
    AuthService.logout();
  };
 
  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
      $scope.memberinfo = result.data.msg;
    });
  };
 
  $scope.logout = function() {
    AuthService.logout();
    $state.go('app.login');
    $window.location.reload(true);
  };
})
 
.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('app.login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
});