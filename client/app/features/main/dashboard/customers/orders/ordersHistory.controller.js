export default class ordersHistoryController {
  static get UID(){
    return "ordersHistoryController"
  }

  /* @ngInject */
  constructor($timeout, contextual, orders) {
    "ngInject";

    this.orders = orders;

    $timeout(() => {
      contextual.showDrawer('orderHistory')
        .then((order) => {
        }, () => {
          console.log('Drawer customer order cancelled');
        })
      .catch((err) => {
      });
    });
  }
}
