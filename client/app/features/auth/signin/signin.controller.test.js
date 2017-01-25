'use strict';

import signin from './';

describe('signin Controller', function () {

    let
      SigninCtrl,
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
    beforeEach(angular.mock.module(signin));

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
      SigninCtrl = null;

      UserService.restore();
    });

    function _startController() {

      SigninCtrl = $controller('signinController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }

    it("init - Should initialize the controller and do the signout because the user is logged", function(done) {

      let inviteKey = '123';

      let user = new Preoday.User({
        id: 1
      });

      $stateParams.inviteKey = inviteKey;

      _startController();

      spyOn(UserService, 'isAuth').and.callThrough();
      spyOn(UserService, 'signout').and.returnValue($q.resolve());
      spyOn(SigninCtrl.instance, 'isInvitedUser').and.callThrough();
      spyOn(SigninCtrl.instance, 'checkInvitedUser');
      spyOn(SigninCtrl.instance, 'setInvitedUserData');
      spyOn(SigninCtrl.instance, 'refreshScreen');

      UserService.user = user;

      SigninCtrl = SigninCtrl();

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.isAuth).toHaveBeenCalled();
        expect(UserService.signout).toHaveBeenCalledWith(true);
        expect(SigninCtrl.isInvitedUser).not.toHaveBeenCalled();
        expect(SigninCtrl.refreshScreen).toHaveBeenCalled();
        expect(SigninCtrl.checkInvitedUser).not.toHaveBeenCalled();
        expect(SigninCtrl.setInvitedUserData).not.toHaveBeenCalled();

        done();
      });
    });

    it("init - Should initialize and check the invite user because the page was refreshed", function(done) {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      _startController();

      spyOn(UserService, 'isAuth').and.callThrough();
      spyOn(UserService, 'signout').and.returnValue($q.resolve());
      spyOn(SigninCtrl.instance, 'isInvitedUser').and.callThrough();
      spyOn(SigninCtrl.instance, 'checkInvitedUser');
      spyOn(SigninCtrl.instance, 'setInvitedUserData');
      spyOn(SigninCtrl.instance, 'refreshScreen');

      SigninCtrl = SigninCtrl();

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.isAuth).toHaveBeenCalled();
        expect(UserService.signout).not.toHaveBeenCalled();
        expect(SigninCtrl.isInvitedUser).toHaveBeenCalled();
        expect(SigninCtrl.refreshScreen).not.toHaveBeenCalled();
        expect(SigninCtrl.checkInvitedUser).toHaveBeenCalled();
        expect(SigninCtrl.setInvitedUserData).not.toHaveBeenCalled();

        done();
      });
    });

    it("init - Should initialize and set the user data", function(done) {

      let inviteKey = '123';
      let invitedUser = {
        userId: 1
      };

      $stateParams.inviteKey = inviteKey;
      $stateParams.invitedUser = invitedUser;

      _startController();

      spyOn(UserService, 'isAuth').and.callThrough();
      spyOn(UserService, 'signout').and.returnValue($q.resolve());
      spyOn(SigninCtrl.instance, 'isInvitedUser').and.callThrough();
      spyOn(SigninCtrl.instance, 'checkInvitedUser');
      spyOn(SigninCtrl.instance, 'setInvitedUserData');
      spyOn(SigninCtrl.instance, 'refreshScreen');

      SigninCtrl = SigninCtrl();

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.isAuth).toHaveBeenCalled();
        expect(UserService.signout).not.toHaveBeenCalled();
        expect(SigninCtrl.isInvitedUser).toHaveBeenCalled();
        expect(SigninCtrl.refreshScreen).not.toHaveBeenCalled();
        expect(SigninCtrl.checkInvitedUser).not.toHaveBeenCalled();
        expect(SigninCtrl.setInvitedUserData).toHaveBeenCalledWith(invitedUser);

        done();
      });
    });

    it("init - Should initialize and do nothing because is a normal login", function(done) {

      _startController();

      spyOn(UserService, 'isAuth').and.callThrough();
      spyOn(UserService, 'signout');
      spyOn(SigninCtrl.instance, 'isInvitedUser').and.callThrough();
      spyOn(SigninCtrl.instance, 'checkInvitedUser');
      spyOn(SigninCtrl.instance, 'setInvitedUserData');
      spyOn(SigninCtrl.instance, 'refreshScreen');

      SigninCtrl = SigninCtrl();

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.isAuth).toHaveBeenCalled();
        expect(UserService.signout).not.toHaveBeenCalled();
        expect(SigninCtrl.isInvitedUser).toHaveBeenCalled();
        expect(SigninCtrl.refreshScreen).not.toHaveBeenCalled();
        expect(SigninCtrl.checkInvitedUser).not.toHaveBeenCalled();
        expect(SigninCtrl.setInvitedUserData).not.toHaveBeenCalled();

        done();
      });
    });

    it("checkInvitedUser - Should show the expired invite message because request returns an error", function(done) {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      _startController();

      spyOn(UserInviteService, 'getUserByKey').and.returnValue($q.reject());
      spyOn(UserInviteService, 'isExpired');
      spyOn(SigninCtrl.instance, 'showExpiredInviteMessage');
      spyOn(SigninCtrl.instance, 'setInvitedUserData');
      spyOn(Spinner, 'hide');
      spyOn(Spinner, 'show');

      SigninCtrl = SigninCtrl();

      SigninCtrl.checkInvitedUser();

      setTimeout(() => {

        $scope.$digest();

        expect(Spinner.show).toHaveBeenCalledWith('invite-user');
        expect(UserInviteService.getUserByKey).toHaveBeenCalledWith(inviteKey);
        expect(UserInviteService.isExpired).not.toHaveBeenCalled();
        expect(SigninCtrl.setInvitedUserData).not.toHaveBeenCalled();
        expect(Spinner.hide).not.toHaveBeenCalled();
        expect(SigninCtrl.showExpiredInviteMessage).toHaveBeenCalled();

        done();
      });
    });

    it("checkInvitedUser - Should show the expired invite message because the invited is expired", function(done) {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      let invitedUser = {
        expiryDate: moment().subtract(1, 'days')
      };

      _startController();

      spyOn(UserInviteService, 'getUserByKey').and.returnValue($q.resolve(invitedUser));
      spyOn(UserInviteService, 'isExpired').and.callThrough();
      spyOn(SigninCtrl.instance, 'showExpiredInviteMessage');
      spyOn(SigninCtrl.instance, 'setInvitedUserData');
      spyOn(Spinner, 'hide');
      spyOn(Spinner, 'show');

      SigninCtrl = SigninCtrl();

      SigninCtrl.checkInvitedUser();

      setTimeout(() => {

        $scope.$digest();

        expect(Spinner.show).toHaveBeenCalledWith('invite-user');
        expect(UserInviteService.getUserByKey).toHaveBeenCalledWith(inviteKey);
        expect(UserInviteService.isExpired).toHaveBeenCalledWith(invitedUser);
        expect(SigninCtrl.setInvitedUserData).not.toHaveBeenCalled();
        expect(Spinner.hide).not.toHaveBeenCalled();
        expect(SigninCtrl.showExpiredInviteMessage).toHaveBeenCalled();

        done();
      });
    });

    it("checkInvitedUser - Should set the invited user in ctrl and hide spinner", function(done) {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      let invitedUser = {
        userId: 1
      };

      _startController();

      spyOn(UserInviteService, 'getUserByKey').and.returnValue($q.resolve(invitedUser));
      spyOn(UserInviteService, 'isExpired').and.callThrough();
      spyOn(SigninCtrl.instance, 'showExpiredInviteMessage');
      spyOn(SigninCtrl.instance, 'setInvitedUserData');
      spyOn(Spinner, 'hide');
      spyOn(Spinner, 'show');

      SigninCtrl = SigninCtrl();

      SigninCtrl.checkInvitedUser();

      setTimeout(() => {

        $scope.$digest();

        expect(Spinner.show).toHaveBeenCalledWith('invite-user');
        expect(UserInviteService.getUserByKey).toHaveBeenCalledWith(inviteKey);
        expect(UserInviteService.isExpired).toHaveBeenCalledWith(invitedUser);
        expect(SigninCtrl.setInvitedUserData).toHaveBeenCalledWith(invitedUser);
        expect(Spinner.hide).toHaveBeenCalledWith('invite-user');
        expect(SigninCtrl.showExpiredInviteMessage).not.toHaveBeenCalled();

        done();
      });
    });

    it("doSignin - Should do nothing because form is invalid", function() {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      let invitedUser = {
        userId: 1
      };

      _startController();

      spyOn(UserService, 'auth');
      spyOn(SigninCtrl.instance, 'showSpinner');
      spyOn(SigninCtrl.instance, 'checkDoInvite');
      spyOn(SigninCtrl.instance, 'handleError');

      SigninCtrl = SigninCtrl();

      SigninCtrl.signinForm = {
        $invalid: true
      };

      SigninCtrl.doSignin();

      expect(UserService.auth).not.toHaveBeenCalled();
      expect(SigninCtrl.showSpinner).not.toHaveBeenCalled();
      expect(SigninCtrl.checkDoInvite).not.toHaveBeenCalled();
      expect(SigninCtrl.handleError).not.toHaveBeenCalled();
    });

    it("doSignin - Should call handleError because request returns an error", function(done) {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      let invitedUser = {
        userId: 1
      };

      _startController();

      spyOn(UserService, 'auth').and.returnValue($q.reject());
      spyOn(SigninCtrl.instance, 'showSpinner');
      spyOn(SigninCtrl.instance, 'checkDoInvite');
      spyOn(SigninCtrl.instance, 'handleError');

      SigninCtrl = SigninCtrl();

      SigninCtrl.signinForm = {
        $invalid: false
      };

      SigninCtrl.doSignin();

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.auth).toHaveBeenCalledWith(SigninCtrl.user, true);
        expect(SigninCtrl.showSpinner).toHaveBeenCalled();
        expect(SigninCtrl.checkDoInvite).not.toHaveBeenCalled();
        expect(SigninCtrl.handleError).toHaveBeenCalled();

        done();
      });
    });

    it("doSignin - Should call checkDoInvite because request was success", function(done) {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      let invitedUser = {
        userId: 1
      };

      let user = new Preoday.User({
        id: 1
      });

      _startController();

      spyOn(UserService, 'auth').and.returnValue($q.resolve(user));
      spyOn(SigninCtrl.instance, 'showSpinner');
      spyOn(SigninCtrl.instance, 'checkDoInvite');
      spyOn(SigninCtrl.instance, 'handleError');

      SigninCtrl = SigninCtrl();

      SigninCtrl.signinForm = {
        $invalid: false
      };

      SigninCtrl.doSignin();

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.auth).toHaveBeenCalledWith(SigninCtrl.user, true);
        expect(SigninCtrl.showSpinner).toHaveBeenCalled();
        expect(SigninCtrl.checkDoInvite).toHaveBeenCalledWith(user);
        expect(SigninCtrl.handleError).not.toHaveBeenCalled();

        done();
      });
    });

    it("checkDoInvite - Should show a snack error because request returns an error", function(done) {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      let invitedUser = {
        userId: 1
      };

      let user = new Preoday.User({
        id: 1
      });

      _startController();

      spyOn(UserService, 'checkAdmin');
      spyOn(UserInviteService, 'doInvite').and.returnValue($q.reject());
      spyOn(SigninCtrl.instance, 'isInvitedUser').and.callThrough();
      spyOn(SigninCtrl.instance, 'handleSuccess');
      spyOn(SigninCtrl.instance, 'handleError');
      spyOn(SigninCtrl.instance, 'hideSpinner');
      spyOn(Snack, 'showError');

      SigninCtrl = SigninCtrl();

      SigninCtrl.setInvitedUserData(invitedUser);
      SigninCtrl.checkDoInvite(user);

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.checkAdmin).not.toHaveBeenCalled();
        expect(UserInviteService.doInvite).toHaveBeenCalledWith(invitedUser, user);
        expect(SigninCtrl.isInvitedUser).toHaveBeenCalled();
        expect(SigninCtrl.handleSuccess).not.toHaveBeenCalled();
        expect(SigninCtrl.handleError).not.toHaveBeenCalled();
        expect(SigninCtrl.hideSpinner).toHaveBeenCalled();
        expect(Snack.showError).toHaveBeenCalled();

        done();
      });
    });

    it("checkDoInvite - Should call handleSuccess because doInvite returned success", function(done) {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      let invitedUser = {
        userId: 1
      };

      let user = new Preoday.User({
        id: 1
      });

      _startController();

      spyOn(UserService, 'checkAdmin');
      spyOn(UserInviteService, 'doInvite').and.returnValue($q.resolve());
      spyOn(SigninCtrl.instance, 'isInvitedUser').and.callThrough();
      spyOn(SigninCtrl.instance, 'handleSuccess');
      spyOn(SigninCtrl.instance, 'handleError');
      spyOn(SigninCtrl.instance, 'hideSpinner');
      spyOn(Snack, 'showError');

      SigninCtrl = SigninCtrl();

      SigninCtrl.setInvitedUserData(invitedUser);
      SigninCtrl.checkDoInvite(user);

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.checkAdmin).not.toHaveBeenCalled();
        expect(UserInviteService.doInvite).toHaveBeenCalledWith(invitedUser, user);
        expect(SigninCtrl.isInvitedUser).toHaveBeenCalled();
        expect(SigninCtrl.handleSuccess).toHaveBeenCalled();
        expect(SigninCtrl.handleError).not.toHaveBeenCalled();
        expect(SigninCtrl.hideSpinner).not.toHaveBeenCalled();
        expect(Snack.showError).not.toHaveBeenCalled();

        done();
      });
    });

    it("checkDoInvite - Shouldn't call doInvite and check if is admin because the signin is not an invite", function(done) {

      let user = new Preoday.User({
        id: 1
      });

      _startController();

      spyOn(UserService, 'checkAdmin').and.returnValue($q.resolve());
      spyOn(UserInviteService, 'doInvite');
      spyOn(SigninCtrl.instance, 'isInvitedUser').and.callThrough();
      spyOn(SigninCtrl.instance, 'handleSuccess');
      spyOn(SigninCtrl.instance, 'handleError');
      spyOn(SigninCtrl.instance, 'hideSpinner');
      spyOn(Snack, 'showError');

      SigninCtrl = SigninCtrl();

      SigninCtrl.checkDoInvite(user);

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.checkAdmin).toHaveBeenCalledWith(user);
        expect(UserInviteService.doInvite).not.toHaveBeenCalled();
        expect(SigninCtrl.isInvitedUser).toHaveBeenCalled();
        expect(SigninCtrl.handleSuccess).toHaveBeenCalled();
        expect(SigninCtrl.handleError).not.toHaveBeenCalled();
        expect(SigninCtrl.hideSpinner).not.toHaveBeenCalled();
        expect(Snack.showError).not.toHaveBeenCalled();

        done();
      });
    });

    it("doForgotPassword - Should call forgotPassword and send the link", function(done) {

      _startController();

      spyOn(UserService, 'forgotPassword').and.returnValue($q.resolve());
      spyOn(SigninCtrl.instance, 'showSpinner');
      spyOn(SigninCtrl.instance, 'buildForgotLink').and.callThrough();
      spyOn(SigninCtrl.instance, 'hideSpinner');
      spyOn(Snack, 'show');
      spyOn(Snack, 'showError');

      SigninCtrl = SigninCtrl();

      SigninCtrl.forgotPasswordForm = {
        $invalid: false
      };

      let userEmail = 'test@tester.com';

      SigninCtrl.forgotPassword.email = userEmail;

      SigninCtrl.doForgotPassword();

      setTimeout(() => {

        $scope.$digest();

        expect(UserService.forgotPassword).toHaveBeenCalledWith({
          email: userEmail,
          link: 'http://local.app.preoday.com/reset?url=' + window.location.origin + '/&code='
        });
        expect(SigninCtrl.hideSpinner).toHaveBeenCalled();
        expect(Snack.show).toHaveBeenCalled();
        expect(Snack.showError).not.toHaveBeenCalled();

        done();
      });
    });

});