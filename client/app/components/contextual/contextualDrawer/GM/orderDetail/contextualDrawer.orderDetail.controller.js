export default class contextualDrawerOrderDetailController {
  static get UID(){
    return "ContextualDrawerOrderDetail";
  }

  close() {
    this.$window.history.back();
  }

  done() {
    this.$state.go('main.dashboard.customers.search', {
      value: this.$stateParams.value
    });
  }

  amendOrder() {
    const {
      StateService,
      Snack,
      ErrorService,
      OperateService
    } = this;

    if (!StateService.channel || !StateService.channel.operateUrl) {
      return Snack.showError(ErrorService.REQUIRED_CHANNEL_OPERATOR_URL.message);
    }

    OperateService.openNewTab();
    this.cancelOrder()
      .then(order => {
        this.generateTokenAndGoToWeborders();
      });
  }

  cancelOrder() {
    if (!this.order) {
      return this.showError();
    }

    const {
      $q,
      Spinner,
      $scope,
      StateService,
      Snack,
      ErrorService,
    } = this;

    if (!StateService.channel || !StateService.channel.operateUrl) {
      return Snack.showError(ErrorService.REQUIRED_CHANNEL_OPERATOR_URL.message);
    }

    const LOADER_KEY = 'cancel-order';

    return $q((resolve, reject) => {
      let order = new Preoday.Order.constructor(this.order);
      order.statusReason = 'Cancelled by user';
      delete order.venue;

      Spinner.show(LOADER_KEY);
      order.cancel()
        .then(cancelledOrder => {
          $scope.$applyAsync(() => {
            Object.keys(cancelledOrder).forEach((key) => (cancelledOrder[key] == null) && delete cancelledOrder[key]);
            Object.assign(this.order, cancelledOrder);
            Spinner.hide(LOADER_KEY);
            resolve(cancelledOrder);
          });
        }, error => {
          $scope.$applyAsync(() => {
            Spinner.hide(LOADER_KEY);
            this.showError();
            reject(error);
          });
        });
    });
  }

  showError() {
    return this.DialogService.show(this.ErrorService.FAILED_LOADING_ORDER.title, this.ErrorService.FAILED_LOADING_ORDER.message, [{
      name: this.LabelService.CONFIRMATION
    }]).then(() => {
      this.close();
    });
  }

  isAmendOrCancelAvailable() {
    const availableStatus = ["PENDING", "ACCEPTED"];
    return this.order && availableStatus.indexOf(this.order.status) > -1;
  }

  reorder() {
    const {
      StateService,
      Snack,
      ErrorService,
      OperateService
    } = this;

    if (!StateService.channel || !StateService.channel.operateUrl) {
      return Snack.showError(ErrorService.REQUIRED_CHANNEL_OPERATOR_URL.message);
    }

    OperateService.openNewTab();
    this.generateTokenAndGoToWeborders();
  }

  generateTokenAndGoToWeborders() {

    const {
      Spinner,
      Snack,
      gettextCatalog,
      OperateService,
    } = this;
    const LOADER_KEY = 'generate-token';

    function _error(err) {
      console.log('Customer Order Detail [generateTokenAndGoToWeborders] - error', err);
      this.hideSpinner(LOADER_KEY);
      Snack.showError(gettextCatalog.getString('An error occurred to open the weborders, try again later please'));
    }

    Spinner.show(LOADER_KEY);

    OperateService.generateTokenAndGoToWeborders(this.order.userId, OperateService.getWebordersLinkByOrder(this.order))
      .then(() => {

        console.log('Customer Order Detail [generateTokenAndGoToWeborders] - weborders opened');
        this.hideSpinner(LOADER_KEY);
      }, _error.bind(this))
      .catch(_error.bind(this));
  }

  hideSpinner(loaderKey) {
    this.$rootScope.$applyAsync(() => {
      this.Spinner.hide(loaderKey);
    });
  }

  constructor($scope, $rootScope, $timeout, $window, $state, $stateParams, $q, Spinner, DialogService, LabelService, ErrorService, Snack, OperateService, StateService) {
    "ngInject";

    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$window = $window;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$q = $q;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.Snack = Snack;
    this.OperateService = OperateService;
    this.StateService = StateService;
  }
}
