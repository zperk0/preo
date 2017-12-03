export default class ordersHistoryController {
  static get UID(){
    return "ordersHistoryController"
  }

  /* @ngInject */
  constructor($window, $timeout, contextual, orders) {
    "ngInject";

    this.orders = orders;

    $timeout(() => {
      contextual.showDrawer('orderHistory')
        .then((order) => {
        }, (err) => {
          if (err && err.isEscape) {
            $window.history.back();
          }
          console.log('Drawer customer order cancelled');
        })
      .catch((err) => {
      });
    });
  }
}
