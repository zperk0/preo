
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

  setInvitedUserData (invitedUser) {

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

  constructor($state, $stateParams, UserService, UserInviteService, Spinner, DialogService, ErrorService, gettextCatalog) {
    "ngInject";

    this.$state = $state;
    this.$stateParams = $stateParams;
    this.UserInviteService = UserInviteService;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.gettextCatalog = gettextCatalog;

    this.user = {

    };

    if (UserService.isAuth()) {
      this.showSpinner();
      return UserService.logout(true)
              .then(this.refreshScreen.bind(this), this.refreshScreen.bind(this));
    }

    if ($stateParams.invitedUser) {
      this.setInvitedUserData($stateParams.invitedUser);
    } else {
      this.checkInvitedUser();
    }
  }
}