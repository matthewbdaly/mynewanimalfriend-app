describe('Routes', function () {

  beforeEach(angular.mock.module('mynewanimalfriend'));
  it('should map default route to home controller', function () {
    inject(function ($route) {
      expect($route.routes['/'].controller).toBe('HomeCtrl');
      expect($route.routes['/'].templateUrl).toEqual('templates/home.html');
    });
  });

  it('should map login route to login controller', function () {
    inject(function ($route) {
      expect($route.routes['/login'].controller).toBe('LoginCtrl');
      expect($route.routes['/login'].templateUrl).toEqual('templates/login.html');
    });
  });

  it('should map logout route to logout controller', function () {
    inject(function ($route) {
      expect($route.routes['/logout'].controller).toBe('LogoutCtrl');
      expect($route.routes['/logout'].templateUrl).toEqual('templates/login.html');
    });
  });

  it('should redirect other or empty routes to the home controller', function () {
    inject(function ($route) {
      expect($route.routes[null].redirectTo).toEqual('/')
    });
  });
});
