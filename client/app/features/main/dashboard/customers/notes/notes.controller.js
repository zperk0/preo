export default class notesController {
  static get UID(){
    return "notesController"
  }

  /* @ngInject */
  constructor($window, $timeout, contextual, notes) {
    'ngInject';

    this.notes = notes;

    $timeout(() => {
      contextual.showDrawer('customerNotes')
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
