'use strict';

import signup from './';

describe('signup Controller', function () {

    let
      SignupCtrl,
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
    beforeEach(angular.mock.module(signup));

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
      SignupCtrl = null;

      UserService.restore();
    });

    function _startController() {

      SignupCtrl = $controller('signupController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }

    it("init - Should initialize the controller and set invited user data", function() {

      let inviteKey = '123';

      let invitedUser = {
        userId: 1
      };

      $stateParams.inviteKey = inviteKey;
      $stateParams.invitedUser = invitedUser;

      _startController();

      spyOn(UserService, 'isAuth').and.callThrough();
      spyOn(UserService, 'signout');
      spyOn(SignupCtrl.instance, 'showSpinner');
      spyOn(SignupCtrl.instance, 'refreshScreen');
      spyOn(SignupCtrl.instance, 'setInvitedUserData');
      spyOn(SignupCtrl.instance, 'checkInvitedUser');

      SignupCtrl = SignupCtrl();

      expect(UserService.isAuth).toHaveBeenCalled();
      expect(UserService.signout).not.toHaveBeenCalled();
      expect(SignupCtrl.showSpinner).not.toHaveBeenCalled();
      expect(SignupCtrl.refreshScreen).not.toHaveBeenCalled();
      expect(SignupCtrl.checkInvitedUser).not.toHaveBeenCalled();
      expect(SignupCtrl.setInvitedUserData).toHaveBeenCalledWith(invitedUser);
    });

    it("init - Should initialize the controller and check invited user because the page was refreshed", function() {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      _startController();

      spyOn(UserService, 'isAuth').and.callThrough();
      spyOn(UserService, 'signout');
      spyOn(SignupCtrl.instance, 'showSpinner');
      spyOn(SignupCtrl.instance, 'refreshScreen');
      spyOn(SignupCtrl.instance, 'setInvitedUserData');
      spyOn(SignupCtrl.instance, 'checkInvitedUser');

      SignupCtrl = SignupCtrl();

      expect(UserService.isAuth).toHaveBeenCalled();
      expect(UserService.signout).not.toHaveBeenCalled();
      expect(SignupCtrl.showSpinner).not.toHaveBeenCalled();
      expect(SignupCtrl.refreshScreen).not.toHaveBeenCalled();
      expect(SignupCtrl.checkInvitedUser).toHaveBeenCalled();
      expect(SignupCtrl.setInvitedUserData).not.toHaveBeenCalled();
    });

    it("init - Should initialize and make the signout because user is logged", function() {

      let user = new Preoday.User({
        id: 1
      });

      _startController();

      spyOn(UserService, 'isAuth').and.callThrough();
      spyOn(UserService, 'signout').and.returnValue($q.resolve());
      spyOn(SignupCtrl.instance, 'showSpinner');
      spyOn(SignupCtrl.instance, 'refreshScreen');
      spyOn(SignupCtrl.instance, 'setInvitedUserData');
      spyOn(SignupCtrl.instance, 'checkInvitedUser');

      UserService.user = user;

      SignupCtrl = SignupCtrl();

      $rootScope.$digest();

      expect(UserService.isAuth).toHaveBeenCalled();
      expect(UserService.signout).toHaveBeenCalledWith(true);
      expect(SignupCtrl.showSpinner).toHaveBeenCalled();
      expect(SignupCtrl.refreshScreen).toHaveBeenCalled();
      expect(SignupCtrl.checkInvitedUser).not.toHaveBeenCalled();
      expect(SignupCtrl.setInvitedUserData).not.toHaveBeenCalled();
    });

    it("checkInvitedUser - Should show the expired invite message because request returns an error", function() {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      _startController();

      spyOn(UserInviteService, 'getUserByKey').and.returnValue($q.reject());
      spyOn(UserInviteService, 'isExpired');
      spyOn(SignupCtrl.instance, 'showExpiredInviteMessage');
      spyOn(SignupCtrl.instance, 'setInvitedUserData');
      spyOn(SignupCtrl.instance, 'hideSpinner');
      spyOn(SignupCtrl.instance, 'showSpinner');

      SignupCtrl = SignupCtrl();

      SignupCtrl.checkInvitedUser();

      $rootScope.$digest();

      expect(SignupCtrl.showSpinner).toHaveBeenCalled();
      expect(UserInviteService.getUserByKey).toHaveBeenCalledWith(inviteKey);
      expect(UserInviteService.isExpired).not.toHaveBeenCalled();
      expect(SignupCtrl.setInvitedUserData).not.toHaveBeenCalled();
      expect(SignupCtrl.hideSpinner).not.toHaveBeenCalled();
      expect(SignupCtrl.showExpiredInviteMessage).toHaveBeenCalled();
    });

    it("checkInvitedUser - Should show the expired invite message because the invited is expired", function() {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      let invitedUser = {
        expiryDate: moment().subtract(1, 'days')
      };

      _startController();

      spyOn(UserInviteService, 'getUserByKey').and.returnValue($q.resolve(invitedUser));
      spyOn(UserInviteService, 'isExpired').and.callThrough();
      spyOn(SignupCtrl.instance, 'showExpiredInviteMessage');
      spyOn(SignupCtrl.instance, 'setInvitedUserData');
      spyOn(SignupCtrl.instance, 'hideSpinner');
      spyOn(SignupCtrl.instance, 'showSpinner');

      SignupCtrl = SignupCtrl();

      SignupCtrl.checkInvitedUser();

      $rootScope.$digest();

      expect(SignupCtrl.showSpinner).toHaveBeenCalled();
      expect(UserInviteService.getUserByKey).toHaveBeenCalledWith(inviteKey);
      expect(UserInviteService.isExpired).toHaveBeenCalledWith(invitedUser);
      expect(SignupCtrl.setInvitedUserData).not.toHaveBeenCalled();
      expect(SignupCtrl.hideSpinner).not.toHaveBeenCalled();
      expect(SignupCtrl.showExpiredInviteMessage).toHaveBeenCalled();
    });

    it("checkInvitedUser - Should set the invited user in ctrl and hide spinner", function() {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      let invitedUser = {
        userId: 1
      };

      _startController();

      spyOn(UserInviteService, 'getUserByKey').and.returnValue($q.resolve(invitedUser));
      spyOn(UserInviteService, 'isExpired').and.callThrough();
      spyOn(SignupCtrl.instance, 'showExpiredInviteMessage');
      spyOn(SignupCtrl.instance, 'setInvitedUserData');
      spyOn(SignupCtrl.instance, 'hideSpinner');
      spyOn(SignupCtrl.instance, 'showSpinner');

      SignupCtrl = SignupCtrl();

      SignupCtrl.checkInvitedUser();

      $rootScope.$digest();

      expect(SignupCtrl.showSpinner).toHaveBeenCalled();
      expect(UserInviteService.getUserByKey).toHaveBeenCalledWith(inviteKey);
      expect(UserInviteService.isExpired).toHaveBeenCalledWith(invitedUser);
      expect(SignupCtrl.setInvitedUserData).toHaveBeenCalledWith(invitedUser);
      expect(SignupCtrl.hideSpinner).toHaveBeenCalled();
      expect(SignupCtrl.showExpiredInviteMessage).not.toHaveBeenCalled();
    });

    it("doSignup - Shouldn't make the request because the form is invalid", function() {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      let invitedUser = {
        userId: 1
      };

      _startController();

      spyOn(UserInviteService, 'doInvite').and.returnValue($q.resolve(invitedUser));
      spyOn(Snack, 'showError');
      spyOn(SignupCtrl.instance, 'goToDashboard');
      spyOn(SignupCtrl.instance, 'hideSpinner');

      SignupCtrl = SignupCtrl();

      SignupCtrl.signupForm = {
        $invalid: true
      };

      SignupCtrl.doSignup();

      expect(UserInviteService.doInvite).not.toHaveBeenCalled();
      expect(SignupCtrl.hideSpinner).not.toHaveBeenCalled();
      expect(SignupCtrl.goToDashboard).not.toHaveBeenCalled();
      expect(Snack.showError).not.toHaveBeenCalled();
    });

    it("doSignup - Should show an error because request returns an error", function() {

      let inviteKey = '123';

      let invitedUser = {
        userId: 1
      };

      $stateParams.inviteKey = inviteKey;
      $stateParams.invitedUser = invitedUser;

      _startController();

      spyOn(UserInviteService, 'doInvite').and.returnValue($q.reject());
      spyOn(Snack, 'showError');
      spyOn(SignupCtrl.instance, 'goToDashboard');
      spyOn(SignupCtrl.instance, 'hideSpinner');

      SignupCtrl = SignupCtrl();

      SignupCtrl.signupForm = {
        $invalid: false
      };

      SignupCtrl.doSignup();

      $rootScope.$digest();

      expect(UserInviteService.doInvite).toHaveBeenCalledWith(invitedUser, SignupCtrl.user);
      expect(SignupCtrl.hideSpinner).toHaveBeenCalled();
      expect(SignupCtrl.goToDashboard).not.toHaveBeenCalled();
      expect(Snack.showError).toHaveBeenCalled();
    });

    it("doSignup - Should do the signup and redirect to dashboard", function() {

      let inviteKey = '123';

      let invitedUser = {
        userId: 1
      };

      $stateParams.inviteKey = inviteKey;
      $stateParams.invitedUser = invitedUser;

      _startController();

      spyOn(UserInviteService, 'doInvite').and.returnValue($q.resolve());
      spyOn(Snack, 'showError');
      spyOn(SignupCtrl.instance, 'goToDashboard');
      spyOn(SignupCtrl.instance, 'hideSpinner');

      SignupCtrl = SignupCtrl();

      SignupCtrl.signupForm = {
        $invalid: false
      };

      SignupCtrl.doSignup();

      $rootScope.$digest();

      expect(UserInviteService.doInvite).toHaveBeenCalledWith(invitedUser, SignupCtrl.user);
      expect(SignupCtrl.hideSpinner).not.toHaveBeenCalled();
      expect(SignupCtrl.goToDashboard).toHaveBeenCalled();
      expect(Snack.showError).not.toHaveBeenCalled();
    });

    it("setInvitedUserData - Should set the invitedUser data to user object", function() {

      let inviteKey = '123';

      let invitedUser = {
        userId: 1,
        name: 'Tester',
        email: 'tester@tester.com'
      };

      $stateParams.inviteKey = inviteKey;

      _startController();

      SignupCtrl = SignupCtrl();

      SignupCtrl.setInvitedUserData(invitedUser);

      expect(SignupCtrl.invitedUser).toEqual(invitedUser);
      expect(SignupCtrl.user.name).toEqual(invitedUser.name);
      expect(SignupCtrl.user.username).toEqual(invitedUser.email);
    });

    it("goToSignIn - Should go to signin and replace browser history", function() {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      _startController();

      SignupCtrl = SignupCtrl();

      spyOn(SignupCtrl, 'hideSpinner');
      spyOn($state, 'go');

      SignupCtrl.goToSignIn();

      expect(SignupCtrl.hideSpinner).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('auth.signin', {}, {
        location: 'replace'
      });
    });

    it("goToDashboard - Should go to dashboard and replace browser history", function() {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      _startController();

      SignupCtrl = SignupCtrl();

      spyOn(SignupCtrl, 'hideSpinner');
      spyOn($state, 'go');

      SignupCtrl.goToDashboard();

      expect(SignupCtrl.hideSpinner).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('main.dashboard', {}, {
        location: 'replace'
      });
    });

    it("showExpiredInviteMessage - Should show the expired message and redirect to signin", function() {

      let inviteKey = '123';

      $stateParams.inviteKey = inviteKey;

      _startController();

      SignupCtrl = SignupCtrl();

      spyOn(SignupCtrl, 'hideSpinner');
      spyOn(SignupCtrl, 'goToSignIn');
      spyOn(DialogService, 'show').and.returnValue($q.resolve());

      SignupCtrl.showExpiredInviteMessage();

      $rootScope.$digest();

      expect(SignupCtrl.hideSpinner).toHaveBeenCalled();
      expect(SignupCtrl.goToSignIn).toHaveBeenCalled();
      expect(DialogService.show).toHaveBeenCalledWith(ErrorService.INVITE_EXPIRED.title, ErrorService.INVITE_EXPIRED.message, [{
        name: 'GOT IT'
      }]);
    });

});