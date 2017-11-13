export default class contextualDrawerCustomerNotesController {
  static get UID(){
    return "ContextualDrawerCustomerNotes";
  }

  done() {
    this.$state.go('main.dashboard.customers.search', {
      value: this.$stateParams.value
    });
  }

  onAddNotes() {
    this.$state.go('main.dashboard.customers.search.notes.new', {
      value: this.$stateParams.value
    });
  }

  constructor($state, $stateParams) {
    "ngInject";

    this.$state = $state;
    this.$stateParams = $stateParams;
  }
}
