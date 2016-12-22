
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

    this.VenueService.selectVenue()
      .then((venues) => {
        console.log("venue selected",  venues)
        if (venues && venues.length){
          this.hideSpinner(2000);
          this.$state.go('main.dashboard');
        } else {
          console.log("doing signout")
          Preoday.User.signout();
        console.log("handle error error else")

          this.handleError()
        }
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
    this.UserService.auth(this.user)
    .then(this.handleSuccess.bind(this), this.handleError.bind(this))
  }

  doForgotPassword () {

    if (this.forgotPasswordForm.$invalid) {
      return;
    }

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

  constructor($state, UserService, Spinner, Snack, $timeout, LabelService, VenueService, gettextCatalog) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;
    this.$timeout = $timeout;
    this.$state = $state;
    this.UserService = UserService;
    this.VenueService = VenueService;
    this.gettextCatalog = gettextCatalog;

    this.shouldShowForgotPassword = false;

    if (UserService.user){
      UserService.signout();
    }
    this.user = {
      username:"",
      password:""
    };
  }
}