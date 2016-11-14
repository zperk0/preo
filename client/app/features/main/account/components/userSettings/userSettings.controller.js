export default class userSettingsController {
  static get UID(){
    return "userSettingsController"
  }

  updateUserLanguage () {

    if (this.user.locale != this.selectedLanguage) {

      this.Spinner.show('user-locale');

      this.user.patch({
        locale: this.selectedLanguage
      }).then(() => {

        this.Spinner.hide('user-locale');
        this.Snack.show(this.gettextCatalog.getString('Language saved'));

        this.$timeout(() => {

          window.location.reload();
        });
      }, () => {

        this.Spinner.hide('user-locale');
        this.Snack.showError(this.gettextCatalog.getString('An error ocurred to change your language. Try again later'));
      });
    }
  }

  /* @ngInject */
  constructor($scope, UserService, UtilsService, Spinner, Snack, gettextCatalog, $timeout) {
  	'ngInject';

    this.Spinner = Spinner;
    this.Snack = Snack;
    this.gettextCatalog = gettextCatalog;
    this.$timeout = $timeout;

    this.user = UserService.getCurrent();
    this.languages = UtilsService.getLanguages();

    this.selectedLanguage = this.user.locale;

    $scope.$watch(() => {

      return this.selectedLanguage;
    }, () => {

      this.updateUserLanguage();
    });
  }
}
