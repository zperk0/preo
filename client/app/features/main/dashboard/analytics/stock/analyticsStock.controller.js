export default class analyticsStockController {
  static get UID(){
    return "analyticsStockController";
  }

  constructor($state, $timeout, $window, Spinner) {
    "ngInject";

    this.spinner = Spinner;
  }

}
