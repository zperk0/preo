export default class contextualDrawerOrderHistoryController {
  static get UID(){
    return "ContextualDrawerOrderHistory";
  }

  close() {
    this.$window.history.back();
  }

  constructor($window) {
    "ngInject";

    this.$window = $window;
  }
}
