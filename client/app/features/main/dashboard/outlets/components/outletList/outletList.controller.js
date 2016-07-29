export default class outletListController {
  static get UID(){
    return "outletListController"
  }

  /* @ngInject */
  constructor($timeout, $q, Spinner, Snack) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
  }
}
