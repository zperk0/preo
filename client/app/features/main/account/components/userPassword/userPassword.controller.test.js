'use strict';

import userPassword from './';

describe('UserPassword Controller', function () {

    let
      UserPasswordCtrl,
      $rootScope,
      $scope,
      $controller,
      UserService,
      VenueService,
      Spinner,
      Snack,
      gettextCatalog,
      $q,
      server,
      currentVenue,
      userMock;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(userPassword));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      UserService = $injector.get('UserService');
      VenueService = $injector.get('VenueService');
      Spinner = $injector.get('Spinner');
      Snack = $injector.get('Snack');
      gettextCatalog = $injector.get('gettextCatalog');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();

      server = sinon.fakeServer.create();

      currentVenue = new Preoday.Venue.constructor({
        id: 9,
      });
      currentVenue.setAsCurrent();

      VenueService.currentVenue = currentVenue;

    }));

    afterEach(function() {

      server.restore();
      UserService.restore();
      UserPasswordCtrl = null;
    });

    function _mockUser (data) {

      if (!data) {
        data = {};
      }

      userMock = new Preoday.User.constructor({
        id: 1,
        username: 'test@tester.com'
      });

      Preoday.User.setUser(userMock);
      UserService.user = userMock;
    }

    function _startController() {

      UserPasswordCtrl = $controller('userPasswordController', {
        '$scope': $scope,
      }, true);
    }

    it("Should initialize the controller", function() {

      _mockUser();
      _startController();

      UserPasswordCtrl = UserPasswordCtrl();

      expect(UserPasswordCtrl.submit).toEqual(jasmine.any(Function));
      expect(UserPasswordCtrl.toggleShowPasswordInput).toEqual(jasmine.any(Function));
      expect(UserPasswordCtrl.checkNewPassword).toEqual(jasmine.any(Function));
      expect(UserPasswordCtrl.cancel).toEqual(jasmine.any(Function));
      expect(UserPasswordCtrl.showForm).toEqual(jasmine.any(Function));
      expect(UserPasswordCtrl.shouldShowForm).toEqual(jasmine.any(Function));
    });

    it("Should change user password", function(done) {

      spyOn(UserService, 'signout').and.returnValue($q.when());
      spyOn(Snack, 'showError').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();

      _mockUser();
      _startController();

      UserPasswordCtrl = UserPasswordCtrl();

      spyOn(UserPasswordCtrl, 'cancel').and.callThrough();

      UserPasswordCtrl.userPasswordForm = {
        $invalid: false,
        confirmNewPassword: {
          $error: false,
          $setValidity: function () {
            // body...
          }
        }
      };
      UserPasswordCtrl.data = {
        confirmNewPassword: 'test',
        newPassword: 'test'
      }

      server.respondWith('POST', '/api/users/auth/change', [200, {"Content-Type": "application/json"}, JSON.stringify({})]);

      UserPasswordCtrl.submit();

      server.respond();
      $rootScope.$digest();

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(UserService.signout).toHaveBeenCalled();
        expect(UserPasswordCtrl.cancel).toHaveBeenCalled();
        expect(Snack.show).toHaveBeenCalled();
        expect(Snack.showError).not.toHaveBeenCalled();
        expect(Spinner.hide).not.toHaveBeenCalled();

        done();
      });
    });

    it("Should show an invalid password error on change user password", function(done) {

      spyOn(UserService, 'signout').and.returnValue($q.when());
      spyOn(Snack, 'showError').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();

      _mockUser();
      _startController();

      UserPasswordCtrl = UserPasswordCtrl();

      spyOn(UserPasswordCtrl, 'cancel').and.callThrough();

      UserPasswordCtrl.userPasswordForm = {
        $invalid: false,
        confirmNewPassword: {
          $error: false,
          $setValidity: function () {
            // body...
          }
        }
      };
      UserPasswordCtrl.data = {
        confirmNewPassword: 'test',
        newPassword: 'test'
      }

      server.respondWith('POST', '/api/users/auth/change', [401, {"Content-Type": "application/json"}, JSON.stringify({
        status: 401,
        message: 'password'
      })]);

      UserPasswordCtrl.submit();

      server.respond();
      $rootScope.$digest();

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(UserService.signout).not.toHaveBeenCalled();
        expect(UserPasswordCtrl.cancel).not.toHaveBeenCalled();
        expect(Snack.show).not.toHaveBeenCalled();
        expect(Snack.showError).toHaveBeenCalledWith(gettextCatalog.getString('Sorry, the old password you entered was incorrect. Please try again!'));
        expect(Spinner.hide).toHaveBeenCalled();

        done();
      });
    });

    it("Should show a default error on change user password", function(done) {

      spyOn(UserService, 'signout').and.returnValue($q.when());
      spyOn(Snack, 'showError').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();

      _mockUser();
      _startController();

      UserPasswordCtrl = UserPasswordCtrl();

      spyOn(UserPasswordCtrl, 'cancel').and.callThrough();

      UserPasswordCtrl.userPasswordForm = {
        $invalid: false,
        confirmNewPassword: {
          $error: false,
          $setValidity: function () {
            // body...
          }
        }
      };
      UserPasswordCtrl.data = {
        confirmNewPassword: 'test',
        newPassword: 'test'
      }

      server.respondWith('POST', '/api/auth/change', [400, {"Content-Type": "application/json"}, JSON.stringify({})]);

      UserPasswordCtrl.submit();

      server.respond();
      $rootScope.$digest();

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(UserService.signout).not.toHaveBeenCalled();
        expect(UserPasswordCtrl.cancel).not.toHaveBeenCalled();
        expect(Snack.show).not.toHaveBeenCalled();
        expect(Snack.showError).toHaveBeenCalledWith(gettextCatalog.getString('An error ocurred to change your password, try again later'));
        expect(Spinner.hide).toHaveBeenCalled();

        done();
      });
    });
});
