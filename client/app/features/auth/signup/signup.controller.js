
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
      inviteKey: this.$stateParams.inviteKey,
      invitedUser: this.invitedUser,
      isUserAuthChecked: true
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

    this.doInvite(this.user, (err) => {
      console.log('SignupController [doSignup] - error ', err);

      if (err && err.status === 409) {
        if (this.$stateParams.inviteKey) {
          this.tryAutomaticInviteSignin();
        } else {
          this.hideSpinner();
          this.Snack.showError(this.gettextCatalog.getString('There is already an account with this email, please try another one.'));
        }
      } else {
        this.hideSpinner();
        this.Snack.showError(this.gettextCatalog.getString('An error ocurred in your signup, try again later'));
      }
    });
  }

  doInvite(user, callbackError) {

    if (!callbackError) {
      callbackError = () => {};
    }

    this.UserInviteService.doInvite(this.invitedUser, user)
      .then(this.goToDashboard.bind(this), callbackError.bind(this));
  }

  tryAutomaticInviteSignin() {

    function _showErrorAndGoToSignin() {
      this.hideSpinner();
      this.Snack.showError(this.gettextCatalog.getString('There is already an account with this email, you need to sign in to continue.'));
      this.redirectSignIn();
    }


    this.UserService.auth(this.user, true)
      .then((user) => {

        this.doInvite(user, (err) => {
          this.UserService.signout(true)
            .then(_showErrorAndGoToSignin.bind(this), _showErrorAndGoToSignin.bind(this));
        });
      }, _showErrorAndGoToSignin.bind(this));
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