
export default class customersController {
  static get UID(){
    return "customersController"
  }

  onSearchChange () {
    this.searching = true;
    this.errorMessage = null;
  }

  isSearching() {
    return this.searching || this.StateService.isSearchingCustomers;
  }

  onDebounceChange () {

    if (!this.customersSearch || this.customersSearch.length === 0) {
      this.goToPlaceholder();
      return;
    }

    if (this.customersSearch.length > 2) {
      this.errorMessage = null;
      this.makeSearch();
    } else {
      this.searching = false;
      this.errorMessage = this.gettextCatalog.getString('Please enter a minimum of 3 characters to search.');
    }
  }

  goToPlaceholder() {
    this.searching = false;
    this.errorMessage = null;
    this.$state.go('main.dashboard.customers.placeholder');
  }

  onClear() {
    this.goToPlaceholder();
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
  constructor($scope, $state, StateService, gettextCatalog) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;
    this.StateService = StateService;
    this.gettextCatalog = gettextCatalog;

    this.searching = false;
    this.errorMessage = null;

    this.customers = [];
  }
}
