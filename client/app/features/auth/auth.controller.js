
export default class authController {
  static get UID(){
    return "authController";
  }


  constructor(UtilsService) {
    "ngInject";

    this.backgroundImage = UtilsService.getImagePath('/images/webapp/sign-in-bg.png');
    this.preodayLogo = UtilsService.getImagePath('/images/webapp/logo-white.svg');
  }
}
