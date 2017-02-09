'use strict';

import invite from './';

describe('invite Controller', function () {

    let
      InviteCtrl,
      VenueService,
      $rootScope,
      $scope,
      $state,
      $stateParams,
      Snack,
      server,
      $controller,
      $timeout,
      $q,
      Spinner,
      UserInviteService,
      UserService,
      ErrorService,
      DialogService;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(invite));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $state = $injector.get('$state');
      $stateParams = $injector.get('$stateParams');
      VenueService = $injector.get('VenueService');
      Snack = $injector.get('Snack');
      Spinner = $injector.get('Spinner');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      UserInviteService = $injector.get('UserInviteService');
      UserService = $injector.get('UserService');
      ErrorService = $injector.get('ErrorService');
      DialogService = $injector.get('DialogService');

      $scope = $rootScope.$new();
      $scope.scrollToBottom = () => {};
      VenueService.currentVenue = {id: 5};
    }));

    afterEach(function() {

      server.restore();
      InviteCtrl = null;

      UserService.restore();
    });

    function _startController() {

      InviteCtrl = $controller('inviteController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }

    it("init - Should initialize the controller", function() {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      _startController();

      spyOn(Spinner, 'show');
      spyOn(InviteCtrl.instance, 'validate');

      InviteCtrl = InviteCtrl();

      expect(Spinner.show).toHaveBeenCalled();
      expect(InviteCtrl.validate).toHaveBeenCalledWith(inviteKey);
    });

    it("validate - Should show the expired message because getUserByKey request returns an error", function(done) {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      _startController();

      spyOn(Spinner, 'show');
      spyOn(InviteCtrl.instance, 'validate').and.callThrough();
      spyOn(UserInviteService, 'getUserByKey').and.returnValue($q.reject());
      spyOn(UserInviteService, 'isExpired');
      spyOn(InviteCtrl.instance, 'showExpiredMessage');
      spyOn(InviteCtrl.instance, 'checkInvitedUser');

      InviteCtrl = InviteCtrl();

      setTimeout(() => {

        $scope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(InviteCtrl.validate).toHaveBeenCalledWith(inviteKey);
        expect(UserInviteService.getUserByKey).toHaveBeenCalledWith(inviteKey);
        expect(UserInviteService.isExpired).not.toHaveBeenCalled();
        expect(InviteCtrl.showExpiredMessage).toHaveBeenCalled();
        expect(InviteCtrl.checkInvitedUser).not.toHaveBeenCalled();

        done();
      });
    });

    it("validate - Should show the expired message because the invite is expired", function(done) {

      let inviteKey = '123';
      let invitedUser = {
        expiryDate: moment().subtract(1, 'days')
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      spyOn(Spinner, 'show');
      spyOn(InviteCtrl.instance, 'validate').and.callThrough();
      spyOn(UserInviteService, 'getUserByKey').and.returnValue($q.resolve(invitedUser));
      spyOn(UserInviteService, 'isExpired').and.callThrough();
      spyOn(InviteCtrl.instance, 'showExpiredMessage');
      spyOn(InviteCtrl.instance, 'checkInvitedUser');

      InviteCtrl = InviteCtrl();

      setTimeout(() => {

        $scope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(InviteCtrl.validate).toHaveBeenCalledWith(inviteKey);
        expect(UserInviteService.getUserByKey).toHaveBeenCalledWith(inviteKey);
        expect(UserInviteService.isExpired).toHaveBeenCalledWith(invitedUser);
        expect(InviteCtrl.showExpiredMessage).toHaveBeenCalled();
        expect(InviteCtrl.checkInvitedUser).not.toHaveBeenCalled();

        done();
      });
    });

    it("validate - Should check invited user because the invitedUser is valid", function(done) {

      let inviteKey = '123';
      let invitedUser = {
        expiryDate: moment().add(1, 'days')
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      spyOn(Spinner, 'show');
      spyOn(InviteCtrl.instance, 'validate').and.callThrough();
      spyOn(UserInviteService, 'getUserByKey').and.returnValue($q.resolve(invitedUser));
      spyOn(UserInviteService, 'isExpired').and.callThrough();
      spyOn(InviteCtrl.instance, 'showExpiredMessage');
      spyOn(InviteCtrl.instance, 'checkInvitedUser');

      InviteCtrl = InviteCtrl();

      setTimeout(() => {

        $scope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(InviteCtrl.validate).toHaveBeenCalledWith(inviteKey);
        expect(UserInviteService.getUserByKey).toHaveBeenCalledWith(inviteKey);
        expect(UserInviteService.isExpired).toHaveBeenCalledWith(invitedUser);
        expect(InviteCtrl.showExpiredMessage).not.toHaveBeenCalled();
        expect(InviteCtrl.checkInvitedUser).toHaveBeenCalledWith(invitedUser);

        done();
      });
    });

    it("checkInvitedUser - Should check userAuth because user is not logged locally", function() {

      let inviteKey = '123';
      let invitedUser = {
        expiryDate: moment().add(1, 'days')
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn(UserService, 'isAuth').and.callThrough();
      spyOn(InviteCtrl, 'checkUserAuth');
      spyOn(InviteCtrl, 'checkIfIsTheSameUser');

      InviteCtrl.checkInvitedUser(invitedUser);

      expect(UserService.isAuth).toHaveBeenCalled();
      expect(InviteCtrl.checkUserAuth).toHaveBeenCalled();
      expect(InviteCtrl.checkIfIsTheSameUser).not.toHaveBeenCalled();
    });

    it("checkInvitedUser - Should check if is the same user because user is logged", function() {

      let inviteKey = '123';
      let invitedUser = {
        expiryDate: moment().add(1, 'days')
      };

      let user = new Preoday.User({
        id: 1,
        name: 'Tester'
      });

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn(UserService, 'isAuth').and.callThrough();
      spyOn(InviteCtrl, 'checkUserAuth');
      spyOn(InviteCtrl, 'checkIfIsTheSameUser');

      UserService.user = user;

      InviteCtrl.checkInvitedUser(invitedUser);

      expect(UserService.isAuth).toHaveBeenCalled();
      expect(InviteCtrl.checkUserAuth).not.toHaveBeenCalled();
      expect(InviteCtrl.checkIfIsTheSameUser).toHaveBeenCalled();
    });

    it("checkUserAuth - Should check if is the same user because the user is logged", function(done) {

      let inviteKey = '123';
      let invitedUser = {
        expiryDate: moment().add(1, 'days')
      };

      let user = new Preoday.User({
        id: 1,
        name: 'Tester'
      });

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn(UserService, 'auth').and.returnValue($q.resolve(user));
      spyOn(InviteCtrl, 'checkIfIsTheSameUser');
      spyOn(InviteCtrl, 'checkInviteUserId');

      UserService.user = user; // this is to works in fetchUserVenues from venue.service when is called from main.routes.js

      InviteCtrl.checkUserAuth(invitedUser);

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.auth).toHaveBeenCalled();
        expect(InviteCtrl.checkIfIsTheSameUser).toHaveBeenCalled();
        expect(InviteCtrl.checkInviteUserId).not.toHaveBeenCalled();

        done();
      });
    });

    it("checkUserAuth - Should check if user already exists because user is not logged", function(done) {

      let inviteKey = '123';
      let invitedUser = {
        expiryDate: moment().add(1, 'days')
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn(UserService, 'auth').and.returnValue($q.reject());
      spyOn(InviteCtrl, 'checkIfIsTheSameUser');
      spyOn(InviteCtrl, 'checkInviteUserId');

      InviteCtrl.checkUserAuth(invitedUser);

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.auth).toHaveBeenCalled();
        expect(InviteCtrl.checkIfIsTheSameUser).not.toHaveBeenCalled();
        expect(InviteCtrl.checkInviteUserId).toHaveBeenCalled();

        done();
      });
    });

    it("checkInviteUserId - Should redirect to signin because user already exists", function() {

      let inviteKey = '123';
      let invitedUser = {
        userId: 1
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn(InviteCtrl, 'goToSignIn');
      spyOn(InviteCtrl, 'goToSignUp');

      InviteCtrl.checkInviteUserId(invitedUser);

      expect(InviteCtrl.goToSignIn).toHaveBeenCalledWith(invitedUser);
      expect(InviteCtrl.goToSignUp).not.toHaveBeenCalled();
    });

    it("checkInviteUserId - Should redirect to signup because user doesn't exists", function() {

      let inviteKey = '123';
      let invitedUser = {

      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn(InviteCtrl, 'goToSignIn');
      spyOn(InviteCtrl, 'goToSignUp');

      InviteCtrl.checkInviteUserId(invitedUser);

      expect(InviteCtrl.goToSignIn).not.toHaveBeenCalled();
      expect(InviteCtrl.goToSignUp).toHaveBeenCalledWith(invitedUser);
    });

    it("checkIfIsTheSameUser - Should doInvite because the user is the same", function() {

      let inviteKey = '123';

      let user = new Preoday.User({
        id: 1,
        name: 'Tester'
      });

      let invitedUser = {
        userId: user.id
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn(InviteCtrl, 'doInvite');
      spyOn(InviteCtrl, 'checkInviteUserId');
      spyOn(UserService, 'signout').and.callThrough();

      UserService.user = user;

      InviteCtrl.checkIfIsTheSameUser(invitedUser);

      expect(InviteCtrl.doInvite).toHaveBeenCalledWith(invitedUser);
      expect(InviteCtrl.checkInviteUserId).not.toHaveBeenCalled();
      expect(UserService.signout).not.toHaveBeenCalled();
    });

    it("checkIfIsTheSameUser - Should signout and check user id because the logged user is another user", function(done) {

      let inviteKey = '123';

      let user = new Preoday.User({
        id: 1,
        name: 'Tester'
      });

      let invitedUser = {
        userId: user.id + 1
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn(InviteCtrl, 'doInvite');
      spyOn(InviteCtrl, 'checkInviteUserId');
      spyOn(UserService, 'signout').and.returnValue($q.resolve());

      UserService.user = user;

      InviteCtrl.checkIfIsTheSameUser(invitedUser);

      setTimeout(() => {

        $scope.$digest();

        expect(InviteCtrl.doInvite).not.toHaveBeenCalled();
        expect(InviteCtrl.checkInviteUserId).toHaveBeenCalledWith(invitedUser);
        expect(UserService.signout).toHaveBeenCalledWith(true);

        done();
      });
    });

    it("doInvite - Should show expired message because request returns an error", function(done) {

      let inviteKey = '123';

      let user = new Preoday.User({
        id: 1,
        name: 'Tester'
      });

      let invitedUser = {
        userId: user.id
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn(InviteCtrl, 'goToDashboard');
      spyOn(InviteCtrl, 'showExpiredMessage');
      spyOn(UserInviteService, 'doInvite').and.returnValue($q.reject());
      spyOn(UserService, 'getCurrent').and.callThrough();

      UserService.user = user;

      InviteCtrl.doInvite(invitedUser);

      setTimeout(() => {

        $scope.$digest();

        expect(InviteCtrl.goToDashboard).not.toHaveBeenCalled();
        expect(InviteCtrl.showExpiredMessage).toHaveBeenCalled();
        expect(UserInviteService.doInvite).toHaveBeenCalledWith(invitedUser, user);
        expect(UserService.getCurrent).toHaveBeenCalled();

        done();
      });
    });

    it("doInvite - Should redirect to dashboard because request returns success", function(done) {

      let inviteKey = '123';

      let user = new Preoday.User({
        id: 1,
        name: 'Tester'
      });

      let invitedUser = {
        userId: user.id
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn(InviteCtrl, 'goToDashboard');
      spyOn(InviteCtrl, 'showExpiredMessage');
      spyOn(UserInviteService, 'doInvite').and.returnValue($q.resolve());
      spyOn(UserService, 'getCurrent').and.callThrough();

      UserService.user = user;

      InviteCtrl.doInvite(invitedUser);

      setTimeout(() => {

        $scope.$digest();

        expect(InviteCtrl.goToDashboard).toHaveBeenCalled();
        expect(InviteCtrl.showExpiredMessage).not.toHaveBeenCalled();
        expect(UserInviteService.doInvite).toHaveBeenCalledWith(invitedUser, user);
        expect(UserService.getCurrent).toHaveBeenCalled();

        done();
      });
    });

    it("goToDashboard - Should redirect to dashboard and replace browser history", function() {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn($state, 'go');
      spyOn(InviteCtrl, 'hideSpinner');

      InviteCtrl.goToDashboard();

      expect(InviteCtrl.hideSpinner).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('main.dashboard', {}, {
        location: 'replace'
      });
    });

    it("goToSignUp - Should redirect to signup and send parameters", function() {

      let inviteKey = '123';

      let user = new Preoday.User({
        id: 1,
        name: 'Tester'
      });

      let invitedUser = {
        userId: user.id
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn($state, 'go');
      spyOn(InviteCtrl, 'hideSpinner');

      UserService.user = user;

      InviteCtrl.goToSignUp(invitedUser);

      expect(InviteCtrl.hideSpinner).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('auth.signup', {
        invitedUser: invitedUser,
        inviteKey: inviteKey,
        isUserAuthChecked: true
      }, {
        location: 'replace'
      });
    });

    it("goToSignIn - Should redirect to signin and send parameters", function() {

      let inviteKey = '123';

      let user = new Preoday.User({
        id: 1,
        name: 'Tester'
      });

      let invitedUser = {
        userId: user.id
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn($state, 'go');
      spyOn(InviteCtrl, 'hideSpinner');

      UserService.user = user;

      InviteCtrl.goToSignIn(invitedUser);

      expect(InviteCtrl.hideSpinner).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('auth.signin', {
        invitedUser: invitedUser,
        inviteKey: inviteKey,
        isUserAuthChecked: true
      }, {
        location: 'replace'
      });
    });

    it("showExpiredMessage - Should show correct button title and redirect to dashboard because user is logged", function(done) {

      let inviteKey = '123';

      let user = new Preoday.User({
        id: 1,
        name: 'Tester'
      });

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn($state, 'go');
      spyOn(InviteCtrl, 'hideSpinner');
      spyOn(InviteCtrl, 'goToSignIn');
      spyOn(InviteCtrl, 'goToDashboard');
      spyOn(DialogService, 'show').and.returnValue($q.resolve());

      UserService.user = user;

      InviteCtrl.showExpiredMessage();

      setTimeout(() => {

        $scope.$digest();

        expect(InviteCtrl.hideSpinner).toHaveBeenCalled();
        expect(DialogService.show).toHaveBeenCalledWith(ErrorService.INVITE_EXPIRED.title, ErrorService.INVITE_EXPIRED.message, [{
          name: 'GO TO DASHBOARD'
        }]);
        expect(InviteCtrl.goToDashboard).toHaveBeenCalled();
        expect(InviteCtrl.goToSignIn).not.toHaveBeenCalled();

        done();
      });
    });

    it("showExpiredMessage - Should show correct button title and redirect to signin because user is not logged", function(done) {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      _startController();

      InviteCtrl = InviteCtrl();

      spyOn($state, 'go');
      spyOn(InviteCtrl, 'hideSpinner');
      spyOn(InviteCtrl, 'goToSignIn');
      spyOn(InviteCtrl, 'goToDashboard');
      spyOn(DialogService, 'show').and.returnValue($q.resolve());

      InviteCtrl.showExpiredMessage();

      setTimeout(() => {

        $scope.$digest();

        expect(InviteCtrl.hideSpinner).toHaveBeenCalled();
        expect(DialogService.show).toHaveBeenCalledWith(ErrorService.INVITE_EXPIRED.title, ErrorService.INVITE_EXPIRED.message, [{
          name: 'GO TO LOGIN'
        }]);
        expect(InviteCtrl.goToDashboard).not.toHaveBeenCalled();
        expect(InviteCtrl.goToSignIn).toHaveBeenCalled();

        done();
      });
    });
});
