export default class contextualDrawerCustomerNotesNewController {
  static get UID(){
    return "ContextualDrawerCustomerNotesNew";
  }

  close() {
    this.$window.history.back();
  }

  onOrderIdChange(order) {
    this.note.orderId = order ? order.id : null;
  }

  querySearch(query) {
    var results = query ? this.orders.filter(order => {
      return order.id.toString().indexOf(query.toString()) > -1;
    }) : [];
    return results;
  }

  submit() {
    if (this.newNoteForm.$valid) {
      this.Spinner.show('save-note');
      Preoday.CustomerNote.save(this.note)
        .then(newNote => {
          this.note = newNote;
          this.notes.push(newNote);
          this.Spinner.hide('save-note');
          this.Snack.show(this.LabelService.SNACK_CUSTOMER_NOTE_SAVE);
          this.close();
        }, error => {
          this.Spinner.hide('save-note');
          this.Snack.showError(this.LabelService.SNACK_CUSTOMER_NOTE_SAVE_ERROR);
        });
    }
  }

  constructor($window, UserService, $stateParams, Spinner, Snack, LabelService) {
    "ngInject";

    this.$window = $window;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;

    this.note = {
      creatorId: UserService.getCurrent().id,
      userId: $stateParams.customerId
    }
  }
}
