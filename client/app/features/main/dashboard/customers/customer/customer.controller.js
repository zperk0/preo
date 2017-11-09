
export default class customerController {
  static get UID(){
    return "customerController"
  }

  saveOrUpdate(){
    return this.customer.id ? this.customer.update.bind(this.customer) : Preoday.User.create;
  }

  onSuccess(entity) {

    const {
      Spinner,
      Snack,
      LabelService,
      StateService,
      $timeout,
      $state,
    } = this;

    const LOADER_KEY = 'customer-update';

    Spinner.show(LOADER_KEY);
    if (this.customer && entity && entity.firstName) {

      this.customer = entity;

      this.saveOrUpdate()(this.customer).then((newCustomer) => {

        console.log('customerController [onSuccess] - newCustomer', newCustomer);
        this.customer.$deleted = false;
        this.hasSaved = true;

        $timeout(() => {
          angular.extend(this.customer, newCustomer);
          angular.extend(this.originalCustomer, newCustomer);

          this.goBack();
          Spinner.hide(LOADER_KEY);
          Snack.show(LabelService.SNACK_CUSTOMER_SUCCESS);
        });
      }, (err) => {
        console.log('CustomerController [onSuccess] - error on save customer', err);
        Spinner.hide(LOADER_KEY);
        if (err && err.status === 409){
          Snack.showError(LabelService.SNACK_CUSTOMER_CONFLICT);
        } else {
          Snack.showError(LabelService.SNACK_CUSTOMER_ERROR);
        }
      }).catch((err) => {
        console.error('CustomerController [onSuccess] - error on save customer', err);
        Spinner.hide(LOADER_KEY);
        Snack.showError(LabelService.SNACK_CUSTOMER_ERROR);
      })
    }
  }

  onCancel() {
    angular.extend(this.customer, this.originalCustomer);

    this.goBack();
  }

  goBack() {

    const {
      $state,
      $stateParams,
    } = this;

    if (this.isNewCustomer()) {
      $state.go('main.dashboard.customers.placeholder');
    } else {
      $state.go('main.dashboard.customers.search', {
        value: $stateParams.value
      });
    }
  }

  isNewCustomer() {
    return this.$state.current.name === 'main.dashboard.customers.new';
  }

  /* @ngInject */
  constructor($scope, $state, $stateParams, $timeout, StateService, UserService, Spinner, Snack, LabelService, customer) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;

    this.StateService = StateService;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;

    this.originalCustomer = angular.copy(customer);
    this.customer = customer;

    this.customersCtrl = $scope['$customers'];

    const customers = this.customersCtrl.customers;

    if (this.isNewCustomer()) {
      customers.push(customer);
    }

    $scope.$on('$destroy', () => {
      if (!this.hasSaved) {
        if (!this.customer.id) {
          // it's a new invite and wasn't saved. So, we need to remove the empty item from the list
          customers.splice(customers.indexOf(customer), 1);
        } else {
          angular.extend(this.customer, this.originalCustomer);
        }
      }
    });

  }
}
