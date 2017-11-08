
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
    this.searching = true;
    console.log('new value', this.customersSearch);
  }

  onDebounceChange () {

    if (this.customersSearch && this.customersSearch.length > 3) {
      this.makeSearch();
    } else {
      this.$state.go('main.dashboard.customers');
    }
  }

  makeSearch() {

    const {
      $state,
      $scope,
      StateService,
    } = this;

    $state.go('main.dashboard.customers.search', {
      value: this.customersSearch
    });

    StateService.channel.searchCustomers({
      search: this.customersSearch
    }).then((customers) => {

      $scope.$applyAsync(() => {
        this.customers = customers;
        this.searching = false;
      });
    }, () => {
      this.searching = false;
    });
  }

  isSearchView() {

    return this.$state.current.name.indexOf('main.dashboard.customers.search') === 0;
  }

  /* @ngInject */
  constructor($scope, $state, StateService) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;
    this.StateService = StateService;

  }
}
