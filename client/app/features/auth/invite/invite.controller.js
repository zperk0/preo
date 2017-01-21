
export default class inviteController {
  static get UID(){
    return "inviteController";
  }

  goToSignIn (invitedUser) {

    this.hideSpinner();

    this.$state.go('auth.signin', {
      invitedUser: invitedUser,
      inviteKey: invitedUser && this.$stateParams.inviteKey
    }, {
      location: 'replace'
    });
  }

  goToSignUp (invitedUser) {

    this.hideSpinner();

    this.$state.go('auth.signin', {
      invitedUser: invitedUser,
      inviteKey: invitedUser && this.$stateParams.inviteKey
    }, {
      location: 'replace'
    });
  }

  goToDashboard () {

    this.hideSpinner();

    this.$state.go('main.dashboard', {}, {
      location: 'replace'
    });
  }

  showExpiredMessage () {

    this.hideSpinner();

    let userIsLogged = this.UserService.isAuth();

    this.DialogService.show(this.ErrorService.INVITE_EXPIRED.title, this.ErrorService.INVITE_EXPIRED.message, [{
        name: userIsLogged ? this.gettextCatalog.getString('GO TO DASHBOARD') : this.gettextCatalog.getString('GO TO LOGIN')
      }]).then(() => {

        if (userIsLogged) {
          return this.goToDashboard();
        }

        this.goToSignIn();
      });
  }

  validate(key) {

    this.UserInviteService.getUserByKey(key)
      .then((invitedUser) => {

        if (this.UserInviteService.isExpired(invitedUser)) {
          return this.showExpiredMessage();
        }

        this.checkInvitedUser(invitedUser);
      }, () => {

        this.showExpiredMessage();
      });
  }

  checkInvitedUser (invitedUser) {

    if (!this.UserService.isAuth()) {
      return this.checkUserAuth(invitedUser);
    }

    return this.checkIfIsTheSameUser(invitedUser);
  }

  checkIfIsTheSameUser (invitedUser) {

    if (this.UserService.getCurrent().id === invitedUser.userId) {
      return this.doInvite(invitedUser);
    }

    this.UserService.logout(true)
      .then(() => {

        this.checkInviteUserId(invitedUser);
      }, () => {

        this.checkInviteUserId(invitedUser);
      });
  }

  doInvite (invitedUser) {

    invitedUser.accept(this.UserService.getCurrent())
      .then(this.goToDashboard.bind(this), this.showExpiredMessage.bind(this));
  }

  checkUserAuth (invitedUser) {

    this.UserService.auth()
      .then(() => {

        this.checkIfIsTheSameUser(invitedUser);
      }, () => {

        return this.checkInviteUserId(invitedUser);
      });
  }

  checkInviteUserId (invitedUser) {

    if (invitedUser.userId) {
      return this.goToSignIn(invitedUser);
    }

    return this.goToSignUp(invitedUser);
  }

  hideSpinner () {

    this.Spinner.hide('invite-user');
  }

  constructor($state, $stateParams, Spinner, UserInviteService, UserService, DialogService, ErrorService, gettextCatalog) {
    "ngInject";

    this.$state = $state;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.UserInviteService = UserInviteService;
    this.UserService = UserService;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.gettextCatalog = gettextCatalog;

    Spinner.show('invite-user');

    this.validate($stateParams.inviteKey);
  }
}