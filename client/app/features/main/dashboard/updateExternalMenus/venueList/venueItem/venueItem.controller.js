export default class venueItemController {
  static get UID(){
    return "venueItemController"
  }

  onSync(){

  }

  /* @ngInject */
  constructor($q, $stateParams, Spinner, Snack, $timeout, LabelService) {
    "ngInject";
    this.$q = $q;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;
  }
}
