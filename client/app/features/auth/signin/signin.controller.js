
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
      .then(() => {
        this.hideSpinner(2000);
      }, () => {
        this.hideSpinner(2000);
      });

  }

  handleError(){
    this.Snack.showError(this.LabelService.SNACK_WRONG_CREDENTIALS)
    this.hideSpinner();
    console.log("hosing")
  }

  doSignin(Spinner){
    console.log("showing spinner");
    this.showSpinner();
    this.UserService.auth(this.user)
    .then(this.handleSuccess.bind(this),this.handleError.bind(this))
  }

  constructor(UserService, Spinner, Snack, $timeout, LabelService, VenueService) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;
    this.$timeout = $timeout;
    this.UserService = UserService;
    this.VenueService = VenueService;
    if (UserService.user){
      UserService.signout();
    }
    this.user = {
      username:"",
      password:""
    };
  }
}