
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

  goToDashboard () {

    this.hideSpinner();

    this.$state.go('main.dashboard', {}, {
      location: 'replace'
    });
  }

  setInvitedUserData (invitedUser) {

    this.invitedUser = invitedUser;

    this.user.email = invitedUser.email;
    this.user.name = invitedUser.name;
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

    this.UserInviteService.doInvite(this.invitedUser, this.user)
      .then(this.goToDashboard.bind(this), () => {

        this.hideSpinner();
        this.Snack.showError(this.gettextCatalog.getString('An error ocurred in your signup, try again later'));
      });
  }

  constructor($state, $stateParams, UserService, UserInviteService, Spinner, DialogService, ErrorService, gettextCatalog, Snack) {
    "ngInject";

    this.$state = $state;
    this.$stateParams = $stateParams;
    this.UserService = UserService;
    this.UserInviteService = UserInviteService;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.gettextCatalog = gettextCatalog;
    this.Snack = Snack;

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