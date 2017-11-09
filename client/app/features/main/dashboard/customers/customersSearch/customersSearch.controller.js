
export default class customersSearchController {
  static get UID(){
    return "customersSearchController"
  }

  onEditCustomer(customer) {

    this.$state.go('main.dashboard.customers.search.details', {
      value: this.$stateParams.value,
      customerId: customer.id,
      customers: this.customersCtrl.customers
    });
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

  /* @ngInject */
  constructor($scope, $state, $stateParams, StateService, customers) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.StateService = StateService;

    this.customersCtrl = $scope['$customers'];

    if (customers) {
      this.customersCtrl.customers = customers;
      this.customersCtrl.customersSearch = $stateParams.value;
    }

  }
}
