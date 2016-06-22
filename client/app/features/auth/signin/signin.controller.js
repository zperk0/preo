
export default class signinController {
  static get UID(){
    return "signinController";
  }

  hideSpinner(){
    this.$timeout(()=>{
      console.log("hiding");
      this.Spinner.hide("signin");
    },1000)

  }

  showSpinner(){
    console.log("showing");
    this.Spinner.show("signin")
  }

  doSignin(Spinner){
    this.showSpinner();
    this.UserService.auth(this.user)
    .then(this.hideSpinner.bind(this),this.hideSpinner.bind(this))
  }

  constructor(UserService, Spinner,$timeout) {
    "ngInject";
    this.Spinner = Spinner;
    this.$timeout = $timeout;
    this.UserService = UserService;
    if (UserService.user){
      UserService.signout();
    }
    this.user = {
      username:"caio.ricci@gdcommunity.co.uk",
      password:"asdasda"
    };
  }
}