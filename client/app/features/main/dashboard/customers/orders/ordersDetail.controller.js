export default class ordersDetailController {
  static get UID(){
    return "ordersDetailController"
  }

  /* @ngInject */
  constructor($timeout, contextual, order, Spinner) {
    "ngInject";
    
    Spinner.hide('fetch-order');
    this.order = order;

    $timeout(() => {
      contextual.showDrawer('orderDetail')
        .then((order) => {
        }, () => {
          console.log('Drawer customer order cancelled');
        })
      .catch((err) => {
      });
    });
  }
}
