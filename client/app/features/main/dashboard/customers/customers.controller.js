
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

  /* @ngInject */
  constructor() {

		this.customers = [{
			id: 1,
			name: 'test'
		}, {
			id: 2,
			name: 'test 1'
		}]
  }
}
