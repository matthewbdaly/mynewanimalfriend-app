'use strict';

require('angular');
require('angular-route');
require('angular-animate');
require('angular-material');
require('./services');

angular.module('mynewanimalfriend', [
  'ngRoute',
  'ngAnimate',
  'ngMaterial',
  'mynewanimalfriend.controllers'
])

.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (event) {

    if (!Auth.isLoggedIn()) {
      if ($location.path() !== '/login') {
        $location.path('/login');
      }
    }
  });
}])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('sessionInjector');
  $httpProvider.interceptors.push('authInterceptor');
}])

.config(function ($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .when('/', {
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })
  .when('/logout', {
    templateUrl: 'templates/login.html',
    controller: 'LogoutCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
