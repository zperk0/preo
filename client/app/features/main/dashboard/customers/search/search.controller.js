
export default class customersSearchController {
  static get UID(){
    return "customersSearchController"
  }

  onEditCustomer(customer) {
    this.$state.go('main.dashboard.customers.search.details', {
      value: this.$stateParams.value,
      customerId: customer.id,
      skipResolve: false
    }, {
      reload: 'main.dashboard.customers.search.details'
    });
  }

  showCustomerNotes(customer) {
    this.$state.go('main.dashboard.customers.search.notes', {
      value: this.$stateParams.value,
      customerId: customer.id
    }, {
      reload: 'main.dashboard.customers.search.notes'
    });
  }

  onPlaceOrder(customer) {

    const {
      gettextCatalog,
      Spinner,
      Snack,
      StateService,
    } = this;

    function _error(err) {
      console.log('Customer Search Controller [onPlaceOrder] - error', err);
      Spinner.hide(LOADER_KEY);
      Snack.showError(gettextCatalog.getString('An error occurred to open the weborders, try again later please'));
    }

    if (!StateService.channel || !StateService.channel.operateUrl) {
      return Snack.showError(gettextCatalog.getString('This app is not configured to place an order. Please contact the support team.'));
    }

    const LOADER_KEY = 'operate-token';
    Spinner.show(LOADER_KEY);

    this.OperateService.openNewTab();

    this.OperateService.generateTokenAndGoToWeborders(customer.id, StateService.channel.operateUrl)
      .then(() => {

        console.log('Customer Search Controller [onPlaceOrder] - weborders opened');
        Spinner.hide(LOADER_KEY);
      }, _error.bind(this))
      .catch(_error.bind(this));
  }

  onOrderHistory(customer) {
    this.$state.go('main.dashboard.customers.search.orders.history', {
      value: this.$stateParams.value,
      customerId: customer.id
    }, {
      reload: 'main.dashboard.customers.search.orders'
    });
  }

  hasCustomersResults() {
    return !this.customersCtrl.isSearchView() ||
           (this.customersCtrl.customers &&
            this.customersCtrl.customers.length);
  }

  isSearchingCustomer() {
    return this.StateService.isSearchingCustomers;
  }

  shouldShowNoResults() {
    return this.initialized &&
           !this.hasCustomersResults();
  }

  /* @ngInject */
  constructor($scope, $state, $stateParams, $timeout, $rootScope, StateService, BroadcastEvents, OperateService, Spinner, gettextCatalog, Snack, customers) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.StateService = StateService;
    this.OperateService = OperateService;
    this.Spinner = Spinner;
    this.gettextCatalog = gettextCatalog;
    this.Snack = Snack;
    this.initialized = false;

    this.disabledSticky = true;

    this.customersCtrl = $scope['$customers'];

    if (customers) {
      $scope.$applyAsync(() => {
        this.customersCtrl.customers = customers;
        this.customersCtrl.customersSearch = $stateParams.value;
        this.customersCtrl.searching = false;
        this.initialized = true;
      });
    } else {
      this.initialized = true;
    }

    const onViewContentLoaded = $scope.$on('$viewContentLoaded', (event, viewName) => {
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
