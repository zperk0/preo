export default class notesNewController {
  static get UID(){
    return "notesNewController"
  }

  /* @ngInject */
  constructor($timeout, contextual, orders, Spinner) {
    'ngInject';

    Spinner.hide('fetch-orders');
    this.orders = orders;

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
