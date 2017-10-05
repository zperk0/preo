export default class notesController {
  static get UID(){
    return "notesController"
  }

  /* @ngInject */
  constructor($timeout, contextual, notes, Spinner) {
    'ngInject';

    Spinner.hide('fetch-notes');
    this.notes = notes;

    $timeout(() => {
      contextual.showDrawer('customerNotes')
        .then((notes) => {
        }, () => {
          console.log('Drawer customer notes cancelled');
        })
      .catch((err) => {
      });
    });
  }
}
