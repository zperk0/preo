
export default class signinController {
  static get UID(){
    return "signinController";
  }

  doSignin(){
    this.UserService.auth(this.user);
  }


  constructor(UserService) {
    "ngInject";
    this.UserService = UserService;
    if (UserService.user){
      UserService.signout();
    }
    this.user = {
      username:"caio.ricci@gdcommunity.co.uk",
      password:"a"
    };
  }
}