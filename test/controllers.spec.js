'use strict';

describe('Controllers', function () {

  beforeEach(function(){
    jasmine.addMatchers({
      toEqualData: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            return {
              pass: angular.equals(actual, expected)
            };
          }
        };
      }
    });
  });

  beforeEach(angular.mock.module('mynewanimalfriend.controllers'));

  describe('Login Controller', function () {
    var mockBackend, scope;

    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
      mockBackend = _$httpBackend_;
      scope = $rootScope.$new();
      $controller('LoginCtrl', {
        $scope: scope
      });
    }));

    // Test controller scope is defined
    it('should define the scope', function () {
      expect(scope).toBeDefined();
    });

    // Test doLogin is defined
    it('should define the login method', function () {
      expect(scope.doLogin).toBeDefined();
    });

    // Test doLogin works
    it('should allow the user to log in', function () {
      // Mock the backend
      mockBackend.expectPOST('/api/authenticate', '{"email":"user@example.com","password":"password"}').respond({token: 123});

      // Define login data
      scope.credentials = {
        email: 'user@example.com',
        password: 'password'
      };

      //  Submit the request
      scope.doLogin();

      // Flush the backend
      mockBackend.flush();

      // Check login complete
      expect(localStorage.getItem('authHeader')).toEqual('Bearer 123');
    });
  });

  describe('Logout Controller', function () {
    var scope;
    
    beforeEach(inject(function ($rootScope, $controller, Auth) {
      Auth.setUser('Blah');
      scope = $rootScope.$new();
      $controller('LogoutCtrl', {
        $scope: scope
      });
    }));

    // Test controller scope is defined
    it('should define the scope', function () {
      expect(scope).toBeDefined();
    });

    // Test session cleared
    it('should clear the session', function () {
      expect(localStorage.getItem('authHeader')).toEqual(null);
    });
  });

  describe('Home Controller', function () {
    var scope;

    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller('HomeCtrl', {
        $scope: scope
      });
    }));

    // Test controller scope is defined
    it('should define the scope', function () {
      expect(scope).toBeDefined();
    });
  });
});
