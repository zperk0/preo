
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
    this.$state.go('main.dashboard.customers.search.notes', {
      value: this.$stateParams.value,
      customerId: customer.id,
      customers: this.customersCtrl.customers
    });
  }

  onPlaceOrder(customer) {
		console.log('onPlaceOrder', customer);
  }

  onOrderHistory(customer) {
    this.$state.go('main.dashboard.customers.search.orders.history', {
      value: this.$stateParams.value,
      customerId: customer.id,
      customers: this.customersCtrl.customers
    });
  }

  hasCustomersResults() {
    return !this.customersCtrl.isSearchView() ||
           (this.customersCtrl.customers &&
            this.customersCtrl.customers.length);
  }

  /* @ngInject */
  constructor($scope, $state, $stateParams, $timeout, $rootScope, StateService, BroadcastEvents, customers) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.StateService = StateService;

    this.disabledSticky = true;

    this.customersCtrl = $scope['$customers'];

    if (customers) {
      this.customersCtrl.customers = customers;
      this.customersCtrl.customersSearch = $stateParams.value;
    }

    const onViewContentLoaded = $scope.$on('$viewContentLoaded', (event, viewName) => {
console.log('from state here...', event, viewName);
      if (viewName.indexOf('customerDetailView') === 0) {
        // we have an animation in our main-ui-view and we need to wait it to finish to start the sticky
        // If we start the sticky before the animation finish, the sticky will calculate a wrong width for our contextual
        this.disabledSticky = false;
      }
    });


    $scope.$on('$destroy', () => {
      onViewContentLoaded && onViewContentLoaded();
    });

  }
}
