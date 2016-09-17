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
  'mynewanimalfriend.services'
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
