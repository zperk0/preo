
export default class signinController {
  static get UID(){
    return "signinController";
  }

  hideSpinner(timeout=100){
    console.log("hiding spinner")
    this.$timeout(()=>{
      this.Spinner.hide("signin");
    },timeout)

  }

  showSpinner(){
    this.Spinner.show("signin")
  }

  handleSuccess(){

    this.StateService.start()
      .then(() => {
        // console.log("venue selected",  venues)
        // if (venues && venues.length){
          this.hideSpinner(2000);
          // this.$state.go('main.dashboard', {}, {
          //   location: 'replace'
          // });
        // } else {
        //   console.log("doing signout")
        //   Preoday.User.signout();

        //   this.handleError()
        // }
      }, () => {
        console.log("handle error error")
        this.handleError()
      });

  }

  handleError(){
    this.Snack.showError(this.LabelService.SNACK_WRONG_CREDENTIALS)
    this.hideSpinner();
    console.log("hosing")
  }

  doSignin(Spinner){

    if (this.signinForm.$invalid) {
      return;
    }

    console.log("showing spinner");
    this.showSpinner();
    this.UserService.auth(this.user, true)
    .then(this.checkDoInvite.bind(this), this.handleError.bind(this))
  }

  checkDoInvite (user) {

    if (!this.isInvitedUser()) {
      return this.UserService.checkAdmin(user)
              .then(this.handleSuccess.bind(this), this.handleError.bind(this));
    }

    this.UserInviteService.doInvite(this.invitedUser, user)
      .then(this.handleSuccess.bind(this), () => {

        this.hideSpinner();
        this.Snack.showError(this.gettextCatalog.getString('An error ocurred in your signup, try again later'));
      });
  }

  getCurrentDomain () {

    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }

    return window.location.origin;
  }

  buildForgotLink () {

    return window._PREO_DATA._RESET_PASSWORD + '?url=' + (this.getCurrentDomain() + '/') + '&code=';
  }

  doForgotPassword () {

    if (this.forgotPasswordForm.$invalid) {
      return;
    }

    this.forgotPassword.link = this.buildForgotLink();

    this.showSpinner();
    this.UserService.forgotPassword(this.forgotPassword)
    .then(()=>{

      this.hideSpinner();
      this.Snack.show(this.gettextCatalog.getString('Success! Please check your email for further instructions.'));
    }, (err) => {

      let messageError = this.gettextCatalog.getString('Something went wrong, please try again');

      if (err && err.status === 404) {
        messageError = this.gettextCatalog.getString('We could not find an account with that email address');
      }

      this.hideSpinner();
      this.Snack.showError(messageError);
    });
  }

  onForgotPassword () {

    this.shouldShowForgotPassword = true;
  }

  onSignIn () {

    this.shouldShowForgotPassword = false;
  }

  isInvitedUser () {

    return this.$stateParams.inviteKey;
  }

  showExpiredInviteMessage () {

    this.Spinner.hide('invite-user');

    this.DialogService.show(this.ErrorService.INVITE_EXPIRED.title, this.ErrorService.INVITE_EXPIRED.message, [{
        name: this.gettextCatalog.getString('GOT IT')
      }]).then(this.goToSignInWithoutKey.bind(this));
  }

  checkInvitedUser () {

    this.Spinner.show('invite-user');

    this.UserInviteService.getUserByKey(this.$stateParams.inviteKey)
      .then((invitedUser) => {

        if (this.UserInviteService.isExpired(invitedUser)) {
          return this.showExpiredInviteMessage();
        }

        this.setInvitedUserData(invitedUser);

        this.Spinner.hide('invite-user');
      }, this.showExpiredInviteMessage.bind(this));
  }

  goToSignInWithoutKey () {

    this.Spinner.hide('invite-user');

    this.$state.transitionTo('auth.signin', {}, {
      location: 'replace',
      reload: true
    });
  }

  setInvitedUserData (invitedUser) {

    this.invitedUser = invitedUser;

    this.user.username = invitedUser.email;
  }

  refreshScreen () {

    window.location.reload();
  }

  constructor($state, $stateParams, UserService, Spinner, Snack, $timeout, LabelService, StateService, gettextCatalog, UserInviteService, DialogService, ErrorService) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.UserService = UserService;
    this.StateService = StateService;
    this.gettextCatalog = gettextCatalog;
    this.UserInviteService = UserInviteService;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;

    this.shouldShowForgotPassword = false;

    this.forgotPassword = {};
    this.user = {
      username:"",
      password:""
    };

    if (UserService.isAuth()){
      UserService.signout(true)
        .then(this.refreshScreen.bind(this), this.refreshScreen.bind(this));
    } else if (this.isInvitedUser()) {
      if (!this.$stateParams.invitedUser) {
        this.checkInvitedUser();
      } else {
        this.setInvitedUserData(this.$stateParams.invitedUser);
      }
    }
  }
}