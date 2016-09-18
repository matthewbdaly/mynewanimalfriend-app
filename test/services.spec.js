'use strict';

describe('Services', function () {

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

  beforeEach(angular.mock.module('mynewanimalfriend.services'));

  describe('Token service', function () {
    var mockBackend, Token;

    beforeEach(inject(function (_Token_, _$httpBackend_) {
      Token = _Token_;
      mockBackend = _$httpBackend_;
    }));

    it('can create a new token', function () {
      mockBackend.expectPOST('http://localhost:8000/api/authenticate', '{"email":"bob@example.com","password":"password"}').respond({token: 'mytoken'});
      var token = new Token({
        email: 'bob@example.com',
        password: 'password'
      });
      token.$save(function (response) {
        expect(response).toEqualData({token: 'mytoken'});
      });
      mockBackend.flush();
    });
  });

  describe('Auth service', function () {
    var Auth;

    beforeEach(inject(function (_Auth_) {
      Auth = _Auth_;
    }));

    it('can set user', function () {
      Auth.setUser('mytoken');
      var token = localStorage.getItem('authHeader');
      expect(token).toEqual('Bearer mytoken');
    });

    it('can return login status', function () {
      localStorage.setItem('authHeader', 'Bearer mytoken');
      expect(Auth.isLoggedIn()).toBeTruthy();
    });

    it('can log the user out', function () {
      localStorage.setItem('authHeader', 'Bearer mytoken');
      Auth.logUserOut();
      expect(Auth.isLoggedIn()).toBeFalsy();
      expect(localStorage.getItem('authHeader')).toBeFalsy();
    });
  });
});
