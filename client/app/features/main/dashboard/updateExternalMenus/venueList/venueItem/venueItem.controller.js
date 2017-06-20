export default class venueItemController {
  static get UID(){
    return "venueItemController"
  }

  onSync(){

  }

  /* @ngInject */
  constructor($q, $stateParams, Spinner, Snack, $timeout, LabelService, gettextCatalog) {
    "ngInject";
    this.$q = $q;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;

    this.syncMessage = gettextCatalog.getString('Sync menus');
  }
}
