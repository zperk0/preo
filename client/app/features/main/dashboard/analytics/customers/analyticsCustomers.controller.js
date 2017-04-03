export default class analyticsCustomersController {
  static get UID(){
    return "analyticsCustomersController";
  }

  constructor($state, $timeout, $window, Spinner) {
    "ngInject";

    this.spinner = Spinner;
  }

}
