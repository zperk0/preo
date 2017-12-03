export default class ordersDetailController {
  static get UID(){
    return "ordersDetailController"
  }

  /* @ngInject */
  constructor($window, $timeout, contextual, order) {
    "ngInject";

    this.order = order;

    $timeout(() => {
      contextual.showDrawer('orderDetail')
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
