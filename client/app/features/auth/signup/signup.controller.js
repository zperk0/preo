
export default class signupController {
  static get UID(){
    return "signupController";
  }

  goToSignIn () {

    this.hideSpinner();

    this.$state.go('auth.signin', {}, {
      location: 'replace'
    });
  }

  redirectSignIn() {
    this.hideSpinner();

    this.$state.go('auth.signin', {
      inviteKey: this.$stateParams.inviteKey
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

  setInvitedUserData (invitedUser) {

    this.invitedUser = invitedUser;

    this.user.username = invitedUser.email;
    this.user.name = invitedUser.name;
    this.user.domain = invitedUser.domain;
  }

  checkInvitedUser () {

    this.showSpinner();

    this.UserInviteService.getUserByKey(this.$stateParams.inviteKey)
      .then((invitedUser) => {

        if (this.UserInviteService.isExpired(invitedUser)) {
          return this.showExpiredInviteMessage();
        }

        this.setInvitedUserData(invitedUser);

        this.hideSpinner();
      }, this.showExpiredInviteMessage.bind(this));
  }

  showExpiredInviteMessage () {

    this.hideSpinner();

    this.DialogService.show(this.ErrorService.INVITE_EXPIRED.title, this.ErrorService.INVITE_EXPIRED.message, [{
        name: this.gettextCatalog.getString('GOT IT')
      }]).then(this.goToSignIn.bind(this));
  }

  refreshScreen () {

    window.location.reload();
  }

  showSpinner () {

    this.Spinner.show('signup-invite');
  }

  hideSpinner () {

    this.Spinner.hide('signup-invite');
  }

  doSignup () {

    if (this.signupForm.$invalid) {
      return false;
    }

    this.showSpinner();

    this.user.email = this.user.username;

    this.UserInviteService.doInvite(this.invitedUser, this.user)
      .then(this.goToDashboard.bind(this), () => {

        this.hideSpinner();
        this.Snack.showError(this.gettextCatalog.getString('An error ocurred in your signup, try again later'));
      });
  }

  constructor($state, $timeout, $stateParams, UserService, UserInviteService, Spinner, DialogService, ErrorService, LabelService, gettextCatalog, Snack) {
    "ngInject";

    this.$state = $state;
    this.$stateParams = $stateParams;
    this.UserService = UserService;
    this.UserInviteService = UserInviteService;
    this.LabelService = LabelService;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.gettextCatalog = gettextCatalog;
    this.Snack = Snack;
    this.$timeout = $timeout;

    this.user = {

    };

    if (UserService.isAuth()) {
      this.showSpinner();
      UserService.signout(true)
              .then(this.refreshScreen.bind(this), this.refreshScreen.bind(this));
    } else if ($stateParams.invitedUser) {
      this.setInvitedUserData($stateParams.invitedUser);
    } else {
      this.checkInvitedUser();
    }
  }
}