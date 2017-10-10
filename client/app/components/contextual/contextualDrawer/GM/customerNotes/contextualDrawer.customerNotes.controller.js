export default class contextualDrawerCustomerNotesController {
  static get UID(){
    return "ContextualDrawerCustomerNotes";
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
