export default class contextualDrawerCustomerNotesController {
  static get UID(){
    return "ContextualDrawerCustomerNotes";
  }

  close() {
    this.$window.history.back();
  }

  constructor($window) {
    "ngInject";

    this.$window = $window;
  }
}
