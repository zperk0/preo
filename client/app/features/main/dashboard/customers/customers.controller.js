
export default class customersController {
  static get UID(){
    return "customersController"
  }

  onEditCustomer(customer) {
		console.log('onEditCustomer', customer);
  }

  showCustomerNotes(customer) {
		console.log('showCustomerNotes', customer);
  }

  onPlaceOrder(customer) {
		console.log('onPlaceOrder', customer);
  }

  onOrderHistory(customer) {
		console.log('onOrderHistory', customer);
  }

  onSearchChange () {
    console.log('new value', this.searchCustomers);
  }

  onDebounceChange () {
    console.log('debounce value', this.searchCustomers);
  }

  /* @ngInject */
  constructor($scope) {

		this.customers = [{
			id: 1,
			name: 'test'
		}, {
			id: 2,
			name: 'test 1'
		}];
  }
}
