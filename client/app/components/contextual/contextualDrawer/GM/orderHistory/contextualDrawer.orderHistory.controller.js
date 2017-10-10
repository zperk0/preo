export default class contextualDrawerOrderHistoryController {
  static get UID(){
    return "ContextualDrawerOrderHistory";
  }

  done() {
    this.$state.go('main.dashboard.customers', { userId: this.$stateParams.userId });
  }

  constructor($state, $stateParams) {
    "ngInject";

    this.$state = $state;
    this.$stateParams = $stateParams;
  }
}
