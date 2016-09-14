'use strict';

describe('User Service', function () {

    let
      UserService,
      $rootScope,
      BroadcastEvents,
      server;

    beforeEach(angular.mock.module('webapp'));

    beforeEach(angular.mock.inject(function ($injector) {

      UserService = $injector.get('UserService');
      $rootScope = $injector.get('$rootScope');

      server = sinon.fakeServer.create();
    }));

    afterEach(function() {

      server.restore();
      UserService.restore();
    });

    it("Should initialize the service", function() {

      expect(UserService.isAdmin()).toBe(false);
      expect(UserService.isAuth()).toBe(false);
      expect(UserService.getCurrent()).toBeUndefined();
    });

    it("Should auth the user and shouldn't be an admin", function(done) {

      spyOn(UserService, 'checkAdmin').and.callThrough();

      let userLogged = {
        id: 1,
        name: 'Tester'
      };

      let urlAuth = '/api/users/auth';
      let urlAdmin = '/api/users/auth/roles/admin';

      server.respondWith('POST', urlAuth, [200, {"Content-Type": "application/json"}, JSON.stringify(userLogged)]);
      server.respondWith('GET', urlAdmin, [400, {"Content-Type": "application/json"}, '']);

      // this is because the auth method is called on main.run
      UserService.restore();

      UserService.auth({
        username: 'tester@test.com',
        password: '123'
      });

      server.respond();
      $rootScope.$digest();

      setTimeout(() => {

        server.respond();
        $rootScope.$digest();

        setTimeout(() => {

          $rootScope.$digest();

          expect(UserService.isAdmin()).toBe(false);
          expect(UserService.isAuth()).toBe(true);
          expect(UserService.checkAdmin).toHaveBeenCalled();
          expect(UserService.getCurrent()).toBeDefined();
          expect(UserService.getCurrent().id).toBe(userLogged.id);

          done();
        });
      });
    });

    it("Should auth the user and should be an admin", function(done) {

      spyOn(UserService, 'checkAdmin').and.callThrough();

      let userLogged = {
        id: 1,
        name: 'Tester'
      };

      let urlAuth = '/api/users/auth';
      let urlAdmin = '/api/users/auth/roles/admin';      

      server.respondWith('POST', urlAuth, [200, {"Content-Type": "application/json"}, JSON.stringify(userLogged)]);
      server.respondWith('GET', urlAdmin, [200, {"Content-Type": "application/json"}, '']);

      // this is because the auth method is called on main.run
      UserService.restore();

      UserService.auth({
        username: 'tester@test.com',
        password: '123'
      });

      server.respond();
      $rootScope.$digest();

      setTimeout(() => {

        server.respond();
        $rootScope.$digest();

        setTimeout(() => {

          $rootScope.$digest();

          expect(UserService.isAdmin()).toBe(true);
          expect(UserService.isAuth()).toBe(true);
          expect(UserService.checkAdmin).toHaveBeenCalled();
          expect(UserService.getCurrent()).toBeDefined();
          expect(UserService.getCurrent().id).toBe(userLogged.id);

          done();
        });
      });
    });
});
