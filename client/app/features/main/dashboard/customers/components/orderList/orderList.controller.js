export default class orderListController {
  static get UID(){
    return "orderListController"
  }

  orderClick(order) {

		this.$state.go('main.dashboard.customers.search.orders.detail', {
      value: this.$stateParams.value,
			orderId: order.id
		});
  }

  /* @ngInject */
  constructor($state, $stateParams) {
    "ngInject";

    this.$state = $state;
    this.$stateParams = $stateParams;

  }
}
