// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'dashboard.controller', 'chore.controller', 'household.controller', 'announcement.controller', 'bill.controller'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'LogoutCtrl'
  })

  .state('app.login', {
    url: '/login', 
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.register', {
    url: '/logout',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })

  // .state('app.inside', {
  //   url: '/inside',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/inside.html',
  //       controller: 'InsideCtrl'
  //     }
  //   }
  // })

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  })

  .state('app.chores', {
    url: '/chores',
    views: {
      'menuContent': {
        templateUrl: 'templates/chores.html',
        controller: 'ChoreCtrl as chores'
      }
    }
  })

  .state('app.households', {
    url: '/households',
    views: {
      'menuContent' : {
        templateUrl: 'templates/households.html',
        controller: 'HouseholdCtrl'
        // controller: 'HouseholdCtrl as households'
      }
    }
  })

  .state('app.announcements', {
    url: '/announcements',
    views: {
      'menuContent' : {
        templateUrl: 'templates/announcements.html',
        controller: 'AnnouncementCtrl'
        // controller: 'AnnouncementCtrl as announcements'
      }
    }
  })

  .state('app.bills', {
    url: '/bills',
    views: {
      'menuContent': {
        templateUrl: 'templates/bills.html',
        controller: 'BillCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
})

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'app.login' && next.name !== 'app.register') {
        event.preventDefault();
        $state.go('app.login');
      }
    }
  });
});
