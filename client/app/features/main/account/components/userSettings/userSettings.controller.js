export default class userSettingsController {
  static get UID(){
    return "userSettingsController"
  }

  updateUserLanguage () {

    if (this.user.language != this.selectedLanguage) {
      console.log('update user language here');
    }
  }

  /* @ngInject */
  constructor($scope, UserService, UtilsService) {
  	'ngInject';

    this.user = UserService.getCurrent();
    this.languages = UtilsService.getLanguages();

    this.selectedLanguage = this.user.language;

    $scope.$watch(() => {

      return this.selectedLanguage;
    }, () => {

      this.updateUserLanguage();
    });
  }
}
