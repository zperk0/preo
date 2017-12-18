
export default class authController {
  static get UID(){
    return 'authController';
  }

  constructor(UtilsService) {
    'ngInject';

    // get `cdn` domain images path
    const path = UtilsService.getDomainImagesPath();

    this.logo = UtilsService.getImagePath(path + 'logo.svg');
    this.backgroundImage = UtilsService.getImagePath(path + 'webapp-auth-bg.png');
  }
}
