export default class notesNewController {
  static get UID(){
    return "notesNewController"
  }

  /* @ngInject */
  constructor($timeout, contextual, orders, notes) {
    'ngInject';
    this.orders = orders;
    this.notes = notes;

    $timeout(() => {
      contextual.showDrawer('customerNotesNew')
        .then((notes) => {
        }, () => {
          console.log('Drawer customer notes cancelled');
        })
      .catch((err) => {
      });
    });
  }
}
