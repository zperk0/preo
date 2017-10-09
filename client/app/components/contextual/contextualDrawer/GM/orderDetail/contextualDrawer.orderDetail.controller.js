export default class contextualDrawerOrderDetailController {
  static get UID(){
    return "ContextualDrawerOrderDetail";
  }

  close() {
    this.$window.history.back();
  }

  constructor($window) {
    "ngInject";

    this.$window = $window;
  }
}
