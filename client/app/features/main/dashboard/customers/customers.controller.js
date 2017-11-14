
export default class customersController {
  static get UID(){
    return "customersController"
  }

  onSearchChange () {
    this.searching = true;
  }

  isSearching() {
    return this.searching || this.StateService.isSearchingCustomers;
  }

  onDebounceChange () {

    if (this.customersSearch && this.customersSearch.length > 3) {
      this.makeSearch();
    } else {
      this.searching = false;
      this.$state.go('main.dashboard.customers.placeholder');
    }
  }

  onClear() {
    this.$state.go('main.dashboard.customers.placeholder');
  }

  makeSearch() {

    const {
      $state,
      $scope,
      StateService,
    } = this;

    const stateData = {};

    if ($state.current.name === 'main.dashboard.customers.search' && this.StateService.isSearchingCustomers) {
      stateData.location = 'replace';
    }

    $state.go('main.dashboard.customers.search', {
      value: this.customersSearch,
    }, stateData);
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

    this.customers = [];
  }
}
