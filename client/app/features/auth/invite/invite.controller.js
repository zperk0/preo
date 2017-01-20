
export default class inviteController {
  static get UID(){
    return "inviteController";
  }

  goToSign () {

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

  showExpiredMessage () {

    this.shouldShowMessage = true;
  }

  validate(key) {

    this.UserInviteService.getUserByKey(key)
      .then(() => {

      }, () => {

        // this.goToSign();
      });
  }

  hideSpinner () {

    this.Spinner.hide('invite-user');
  }

  constructor($state, $stateParams, Spinner, UserInviteService) {
    "ngInject";

    this.$state = $state;
    this.UserInviteService = UserInviteService;
    this.Spinner = Spinner;

    Spinner.show('invite-user');

    this.shouldShowMessage = false;

    if (!$stateParams.inviteKey) {
      return this.goToDashboard();
    }

    this.validate($stateParams.inviteKey);
  }
}