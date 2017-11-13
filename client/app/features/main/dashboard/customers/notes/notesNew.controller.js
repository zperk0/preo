export default class notesNewController {
  static get UID(){
    return "notesNewController"
  }

  /* @ngInject */
  constructor($timeout, contextual, orders) {
    'ngInject';
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
