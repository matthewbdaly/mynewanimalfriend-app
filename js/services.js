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
  return $resource('/api/authenticate/');
});
