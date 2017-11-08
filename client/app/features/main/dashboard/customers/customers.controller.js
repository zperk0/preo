
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
    console.log('new value', this.customersSearch);
  }

  onDebounceChange () {

    this.StateService.channel.searchCustomers({
      search: this.customersSearch
    }).then((customers) => {

      this.customers = customers;
    }, () => {

    });
  }

  /* @ngInject */
  constructor($scope, StateService) {

    this.StateService = StateService;
  }
}
