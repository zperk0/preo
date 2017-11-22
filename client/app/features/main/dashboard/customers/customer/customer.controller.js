
export default class customerController {
  static get UID(){
    return "customerController"
  }

  saveOrUpdate(){
    return this.customer.id ? this.customer.update.bind(this.customer) : Preoday.User.create;
  }

  onCustomerSuccessCallback(customer, onSuccessMessage = null) {
    const {
      Spinner,
      Snack,
      $timeout,
      LOADER_KEY,
    } = this;

    console.log('customerController [onCustomerSuccessCallback] - newCustomer', customer);
    this.customer.$deleted = false;
    this.hasSaved = true;

    $timeout(() => {
      angular.extend(this.customer, customer);
      angular.extend(this.originalCustomer, customer);

      this.goBack();
      Spinner.hide(LOADER_KEY);

      if (typeof onSuccessMessage === 'function') {
        onSuccessMessage();
      } else {
        Snack.show(this.LabelService.SNACK_CUSTOMER_SUCCESS);
      }

    });
  }

  onCustomerErrorCallback(err) {
    const {
      Spinner,
      Snack,
      LabelService,
      LOADER_KEY,
    } = this;

    console.log('customerController [onCustomerErrorCallback] - err', err);

    Spinner.hide(LOADER_KEY);
    if (err && err.status === 409){
      Snack.showError(LabelService.SNACK_CUSTOMER_CONFLICT);
    } else {
      Snack.showError(LabelService.SNACK_CUSTOMER_ERROR);
    }
  }

  onCustomerInviteErrorCallback(customer, err) {
    const {
      LabelService,
      Snack,
    } = this;

    console.log('customerController [onCustomerInviteErrorCallback] - err', err);
    this.onCustomerSuccessCallback(customer, () => {
      Snack.showError(LabelService.SNACK_CUSTOMER_SUCCESS_WITH_FAILED_INVITE, {
        hideDelay: 4000
      });
    });
  }

  onSuccess(entity) {

    const {
      Spinner,
      Snack,
      LabelService,
      StateService,
      $timeout,
      $state,
      LOADER_KEY,
    } = this;

    Spinner.show(LOADER_KEY);
    if (this.customer && entity && entity.firstName) {

      let shouldSendInvite = false;

      if ((!this.originalCustomer.email && entity.email) || (entity.email && entity.isPending)) {
        shouldSendInvite = true;
      }

      this.customer = entity;

      this.saveOrUpdate()(this.customer)
        .then((newCustomer) => {

          if (shouldSendInvite) {
            return newCustomer.sendCustomerInvite(this.getRedirectUrl())
                      .then(this.onCustomerSuccessCallback.bind(this, newCustomer), this.onCustomerInviteErrorCallback.bind(this, newCustomer));
          } else {
            return this.onCustomerSuccessCallback(newCustomer);
          }
      }, this.onCustomerErrorCallback.bind(this))
      .catch(this.onCustomerErrorCallback.bind(this));
    }
  }

  onCancel() {
    angular.extend(this.customer, this.originalCustomer);

    this.goBack();
  }

  getRedirectUrl() {
    return this.UtilsService.getHost() + '/channel/' + this.StateService.channel.id;
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
  constructor($scope, $state, $stateParams, $timeout, gettextCatalog, StateService, UserService, Spinner, Snack, LabelService, UtilsService, customers, customer) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;

    this.StateService = StateService;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;
    this.UtilsService = UtilsService;

    this.originalCustomer = angular.copy(customer);
    this.customer = customer;
    this.params = {
      doneButtonText: gettextCatalog.getString('Done')
    };
    this.LOADER_KEY = 'customer-update';

    this.customersCtrl = $scope['$customers'];

    if (this.isNewCustomer()) {
      $scope.$applyAsync(() => {
        customers.splice(0, customers.length);
        customers.push(customer);
      });
    } else if (customer.id && customer.email && customer.isPending) {
      this.params.doneButtonText = gettextCatalog.getString('Resend invite');
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
