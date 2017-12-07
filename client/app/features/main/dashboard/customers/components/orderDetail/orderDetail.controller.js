export default class orderDetailController {
  static get UID(){
    return "orderDetailController"
  }

  getOrderStatus(status) {
    return status ? status.replace('_', ' ') : '';
  }

  clickOrder() {

    this.$state.go('main.dashboard.customers.search.orders.detail', {
      value: this.$stateParams.value,
      customerId: this.$stateParams.customerId,
      orderId: this.order.id,
    });
  }

  /* @ngInject */
  constructor($state, $stateParams) {
    "ngInject";

    this.$state = $state;
    this.$stateParams = $stateParams;
  }
}
