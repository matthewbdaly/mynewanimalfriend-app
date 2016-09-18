'use strict';

require('angular');
require('angular-route');
require('./services');

angular.module('mynewanimalfriend.controllers', [
  'mynewanimalfriend.services',
  "ngMaterial"
])

.controller('LoginCtrl', function ($scope, $location, Token, Auth) {
  $scope.doLogin = function () {
    var token = new Token($scope.credentials);
    token.$save(function (response) {
      if (response.token) {
        // Set up auth service
        Auth.setUser(response.token);

        // Redirect
        $location.path('/');
      }
    }, function (err) {
        alert('Unable to log in - please check your details are correct');
    });
  };
})

.controller('LogoutCtrl', function ($scope, $location, Auth) {
  // Log user out
  Auth.logUserOut();

  // Redirect to login page
  $location.path('/login');
})

.controller('HomeCtrl', function ($scope) {
});
