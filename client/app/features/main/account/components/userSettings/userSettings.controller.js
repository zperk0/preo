export default class userSettingsController {
  static get UID(){
    return "userSettingsController"
  }

  updateUserLanguage () {

  }

  /* @ngInject */
  constructor($scope, UserService) {
  	'ngInject';

    this.language = UserService.getCurrent().language;

    $scope.$watch(() => {

      return this.language;
    }, () => {

      this.updateUserLanguage();
    });
  }
}
