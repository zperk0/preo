'use strict';

import userEmail from './';

describe('UserEmail Controller', function () {

    let
      UserEmailCtrl,
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
    beforeEach(angular.mock.module(userEmail));

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
      UserEmailCtrl = null;
    });

    function _mockUser (data) {

      if (!data) {
        data = {};
      }

      userMock = new Preoday.User({
        id: 1
      });

      Preoday.User.setUser(userMock);
      UserService.user = userMock;
    }

    function _startController() {

      UserEmailCtrl = $controller('userEmailController', {
        '$scope': $scope,
      }, true);
    }

    it("Should initialize the controller", function() {

      _mockUser();
      _startController();

      UserEmailCtrl = UserEmailCtrl();

      expect(UserEmailCtrl.getEmail).toEqual(jasmine.any(Function));
      expect(UserEmailCtrl.submit).toEqual(jasmine.any(Function));
      expect(UserEmailCtrl.cancel).toEqual(jasmine.any(Function));
      expect(UserEmailCtrl.showForm).toEqual(jasmine.any(Function));
      expect(UserEmailCtrl.shouldShowForm).toEqual(jasmine.any(Function));
    });

    it("Should change user email", function(done) {

      spyOn(UserService, 'signout').and.returnValue($q.when());
      spyOn(Snack, 'showError').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();

      _mockUser();
      _startController();

      UserEmailCtrl = UserEmailCtrl();

      spyOn(UserEmailCtrl, 'cancel').and.callThrough();

      UserEmailCtrl.userEmailForm = {
        $invalid: false
      };
      UserEmailCtrl.data = {
        email: 'test@tester.com',
        password: 'test'
      }

      server.respondWith('POST', '/api/users/' + userMock.id + '/change-email', [200, {"Content-Type": "application/json"}, JSON.stringify({})]);

      UserEmailCtrl.submit();

      server.respond();
      $rootScope.$digest();

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(UserService.signout).toHaveBeenCalled();
        expect(UserEmailCtrl.cancel).toHaveBeenCalled();
        expect(Snack.show).toHaveBeenCalled();
        expect(Snack.showError).not.toHaveBeenCalled();
        expect(Spinner.hide).not.toHaveBeenCalled();

        done();
      });
    });

    it("Should show an invalid password error on change user email", function(done) {

      spyOn(UserService, 'signout').and.returnValue($q.when());
      spyOn(Snack, 'showError').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();

      _mockUser();
      _startController();

      UserEmailCtrl = UserEmailCtrl();

      spyOn(UserEmailCtrl, 'cancel').and.callThrough();

      UserEmailCtrl.userEmailForm = {
        $invalid: false
      };
      UserEmailCtrl.data = {
        email: 'test@tester.com',
        password: 'test'
      }

      server.respondWith('POST', '/api/users/' + userMock.id + '/change-email', [401, {"Content-Type": "application/json"}, JSON.stringify({
        status: 401,
        message: 'password'
      })]);

      UserEmailCtrl.submit();

      server.respond();
      $rootScope.$digest();

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(UserService.signout).not.toHaveBeenCalled();
        expect(UserEmailCtrl.cancel).not.toHaveBeenCalled();
        expect(Snack.show).not.toHaveBeenCalled();
        expect(Snack.showError).toHaveBeenCalledWith(gettextCatalog.getString('Sorry, the password you entered was incorrect. Please try again!'));
        expect(Spinner.hide).toHaveBeenCalled();

        done();
      });
    });

    it("Should show a default error on change user email", function(done) {

      spyOn(UserService, 'signout').and.returnValue($q.when());
      spyOn(Snack, 'showError').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();

      _mockUser();
      _startController();

      UserEmailCtrl = UserEmailCtrl();

      spyOn(UserEmailCtrl, 'cancel').and.callThrough();

      UserEmailCtrl.userEmailForm = {
        $invalid: false
      };
      UserEmailCtrl.data = {
        email: 'test@tester.com',
        password: 'test'
      }

      server.respondWith('POST', '/api/users/' + userMock.id + '/change-email', [400, {"Content-Type": "application/json"}, JSON.stringify({})]);

      UserEmailCtrl.submit();

      server.respond();
      $rootScope.$digest();

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(UserService.signout).not.toHaveBeenCalled();
        expect(UserEmailCtrl.cancel).not.toHaveBeenCalled();
        expect(Snack.show).not.toHaveBeenCalled();
        expect(Snack.showError).toHaveBeenCalledWith(gettextCatalog.getString('An error ocurred to change your email, try again later'));
        expect(Spinner.hide).toHaveBeenCalled();

        done();
      });
    });
});
