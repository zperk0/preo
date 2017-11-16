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
    this.openNewTab();
    this.cancelOrder()
      .then(order => {
        this.generateTokenAndGoToWeborders();
      }, err => {
        this.closeReorderTab();
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
    } = this;
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
    this.openNewTab();
    this.generateTokenAndGoToWeborders();
  }

  generateTokenAndGoToWeborders() {

    const {
      Spinner,
      $q,
      Snack,
      gettextCatalog
    } = this;
    const LOADER_KEY = 'generate-token';

    function _error() {
      console.log('Customer Order Detail [getOperatorToken] - error', err);
      this.hideSpinner(LOADER_KEY);
      this.closeReorderTab();
      Snack.showError(gettextCatalog.getString('An error occurred to open the weborders, try again later please'));
      reject(err);
    }

    Spinner.show(LOADER_KEY);

    return $q((resolve, reject) => {
      Preoday.Operate.getCustomerToken(this.order.userId)
        .then((token) => {

          console.log('Customer Order Detail [getOperatorToken] - operate token', token);
          this.openReorder(token);
          this.hideSpinner(LOADER_KEY);
          resolve(token);
        }, _error.bind(this))
        .catch(_error.bind(this));
    });
  }

  hideSpinner(loaderKey) {
    this.$rootScope.$applyAsync(() => {
      this.Spinner.hide(loaderKey);
    });
  }

  openNewTab() {
    this.newTab = this.$window.open('', '_blank');
    this.newTab.document.write(require('./loader.html'));
  }

  openReorder(token) {
    let path = this.$window._PREO_DATA._WEBORDERS;

    if (this.order.permalink) {
      path += this.order.permalink + '?';
    } else {
      path += '?venueId=' + this.order.venueId + '&';
    }

    path += 'orderId=' + this.order.id;

    if (token) {
      path += '&impersonateToken=' + token;
    }

    this.newTab.location.href = path;
  }

  closeReorderTab() {
    this.newTab.close();
  }

  constructor($scope, $rootScope, $timeout, $window, $state, $stateParams, $q, Spinner, DialogService, LabelService, ErrorService, Snack) {
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
  }
}
