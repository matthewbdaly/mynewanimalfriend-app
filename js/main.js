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
  });
});
