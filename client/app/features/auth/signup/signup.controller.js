
export default class signupController {
  static get UID(){
    return "signupController";
  }

  constructor($state, UtilsService) {
    "ngInject";
    this.$state = $state;

    this.backgroundImage = UtilsService.getImagePath('/images/webapp/sign-in-bg.png');
    this.preodayLogo = UtilsService.getImagePath('/images/webapp/logo-white.svg');

    this.user = {

    };
  }
}