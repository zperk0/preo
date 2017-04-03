export default class analyticsOrdersController {
  static get UID(){
    return "analyticsOrdersController";
  }

  constructor($state, $timeout, $window, Spinner) {
    "ngInject";

    this.spinner = Spinner;
  }

}
