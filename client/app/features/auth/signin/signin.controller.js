
export default class signinController {
  static get UID(){
    return "signinController";
  }

  hideSpinner(){
    this.$timeout(()=>{
      this.Spinner.hide("signin");
    },1000)

  }

  showSpinner(){
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
      username:"",
      password:""
    };
  }
}