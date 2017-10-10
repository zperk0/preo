export default class contextualDrawerOrderDetailController {
  static get UID(){
    return "ContextualDrawerOrderDetail";
  }

  close() {
    this.$window.history.back();
  }

  done() {
    this.$state.go('main.dashboard.customers', { userId: this.$stateParams.userId });
  }

  constructor($window, $state, $stateParams) {
    "ngInject";

    this.$window = $window;
    this.$state = $state;
    this.$stateParams = $stateParams;
  }
}
