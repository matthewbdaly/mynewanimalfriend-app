require('angular');
require('angular-route');
require('angular-animate');
require('angular-material');

angular.module('mynewanimalfriend', [
  'ngRoute',
  'ngAnimate',
  'ngMaterial'
])

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
