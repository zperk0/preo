'use strict';

describe('User Invite Service', function () {

    let
      UserInviteService,
      UserService,
      $rootScope,
      $q,
      BroadcastEvents,
      server;

    beforeEach(angular.mock.module('webapp'));

    beforeEach(angular.mock.inject(function ($injector) {

      UserService = $injector.get('UserService');
      UserInviteService = $injector.get('UserInviteService');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      server = sinon.fakeServer.create();
    }));

    afterEach(function() {

      server.restore();
      UserService.restore();
    });

    it("doInvite - Should reject the promise because accept request returns an error", function(done) {

      let invitedUser = new Preoday.Invite({
        userId: 1
      });

      let user = new Preoday.User({
        id: 1
      });

      let resolve = jasmine.createSpy('resolve');
      let reject = jasmine.createSpy('reject');

      spyOn(invitedUser, 'accept').and.returnValue($q.reject());
      spyOn(UserService, 'checkAdmin');

      UserInviteService.doInvite(invitedUser, user)
        .then(resolve, reject);

      setTimeout(() => {

        $rootScope.$digest();

        expect(reject).toHaveBeenCalled();
        expect(UserService.checkAdmin).not.toHaveBeenCalled();
        expect(resolve).not.toHaveBeenCalled();

        done();
      });
    });

    it("doInvite - Should resolve the promise because checkAdmin request returns an error", function(done) {

      let invitedUser = new Preoday.Invite({
        userId: 1
      });

      let user = new Preoday.User({
        id: 1
      });

      let resolve = jasmine.createSpy('resolve');
      let reject = jasmine.createSpy('reject');

      spyOn(invitedUser, 'accept').and.returnValue($q.resolve(user));
      spyOn(UserService, 'checkAdmin').and.returnValue($q.reject());

      UserInviteService.doInvite(invitedUser, user)
        .then(resolve, reject);

      setTimeout(() => {

        $rootScope.$digest();

        expect(reject).not.toHaveBeenCalled();
        expect(UserService.checkAdmin).toHaveBeenCalledWith(user);
        expect(resolve).toHaveBeenCalled();

        done();
      });
    });

    it("doInvite - Should resolve the promise because both requests were success", function(done) {

      let invitedUser = new Preoday.Invite({
        userId: 1
      });

      let user = new Preoday.User({
        id: 1
      });

      let resolve = jasmine.createSpy('resolve');
      let reject = jasmine.createSpy('reject');

      spyOn(invitedUser, 'accept').and.returnValue($q.resolve(user));
      spyOn(UserService, 'checkAdmin').and.returnValue($q.resolve());

      UserInviteService.doInvite(invitedUser, user)
        .then(resolve, reject);

      setTimeout(() => {

        $rootScope.$digest();

        expect(reject).not.toHaveBeenCalled();
        expect(UserService.checkAdmin).toHaveBeenCalledWith(user);
        expect(resolve).toHaveBeenCalled();

        done();
      });
    });
});
