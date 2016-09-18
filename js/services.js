'use strict';

require('angular');
require("angular-resource");

angular.module('mynewanimalfriend.services', ['ngResource'])

.factory('Auth', function(){
  return{
    setUser : function (aUser) {
      localStorage.setItem('authHeader', 'Bearer ' + aUser);
    },
    isLoggedIn: function () {
      var user = localStorage.getItem('authHeader');
      return(user)? user : false;
    },
    logUserOut: function () {
      localStorage.removeItem('authHeader');
    }
  }
})

.factory('Token', function ($resource) {
  return $resource('http://localhost:8000/api/authenticate/');
})

.factory('sessionInjector', function (Auth) {
  var sessionInjector = {
    request: function (config) {
      if (Auth.isLoggedIn()) {
        config.headers.Authorization = Auth.isLoggedIn();
      }
      return config;
    }
  };
  return sessionInjector;
})

.service('authInterceptor', function ($q, Auth, $location) {
  var service = this;

  service.responseError = function (response) {
    if (response.status == 400) {
      Auth.logUserOut();
      $location.path('/login');
    }
    return $q.reject(response);
  };
});
