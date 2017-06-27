export default class venueItemController {
  static get UID(){
    return "venueItemController"
  }

  onSync() {

    this.showSpinner();

    Preoday.POSProvider.refreshMenu(this.venue.id)
      .then(() => {

        this.hideSpinner();
        this.Snack.show(this.gettextCatalog.getString('The menu has been synced'));

        this.$timeout(() => {

          this.$state.go('main.dashboard');
          window.location.reload();
        }, 1000);
      }, () => {

        this.hideSpinner();
        this.Snack.showError(this.gettextCatalog.getString('An error ocurred to sync the menu. Try again later please'));
      });
  }

  showSpinner () {

    this.Spinner.show('update-external-menu');
  }

  hideSpinner () {

    this.Spinner.hide('update-external-menu');
  }

  /* @ngInject */
  constructor($q, $state, $stateParams, Spinner, Snack, $timeout, LabelService, gettextCatalog) {
    "ngInject";
    this.$q = $q;
    this.$state = $state;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;
    this.gettextCatalog = gettextCatalog;
    this.$timeout = $timeout;

    this.syncMessage = gettextCatalog.getString('Sync menus');
  }
}
