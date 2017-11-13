export default class customerNoteController {
  static get UID(){
    return "customerNoteController"
  }

  orderClick() {
		this.$state.go('main.dashboard.customers.search.orders.detail', {
			value: this.$stateParams.value,
			customerId: this.$stateParams.customerId,
			orderId: this.note.orderId
		});
  }

  constructor($state, $stateParams) {
  	"ngInject";

		this.$state = $state;
		this.$stateParams = $stateParams;
  }
}
