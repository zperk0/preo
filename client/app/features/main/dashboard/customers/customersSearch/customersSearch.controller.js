
export default class customersSearchController {
  static get UID(){
    return "customersSearchController"
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

  /* @ngInject */
  constructor($scope, $state, $stateParams, StateService, customers) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;
    this.StateService = StateService;

    this.customersCtrl = $scope['$customers'];

    if (customers) {
      this.customersCtrl.customers = customers;
      this.customersCtrl.customersSearch = $stateParams.value;
    }

  }
}
