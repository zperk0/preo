export default class notesNewController {
  static get UID(){
    return "notesNewController"
  }

  /* @ngInject */
  constructor($window, $timeout, contextual, orders, notes) {
    'ngInject';
    this.orders = orders;
    this.notes = notes;

    $timeout(() => {
      contextual.showDrawer('customerNotesNew')
        .then((notes) => {
        }, (err) => {
          if (err && err.isEscape) {
            $window.history.back();
          }
        })
      .catch((err) => {
      });
    });
  }
}
