export default class contextualDrawerOrderDetailController {
  static get UID(){
    return "ContextualDrawerOrderDetail";
  }

  close() {
    this.$window.history.back();
  }

  done() {
    this.$state.go('main.dashboard.customers', { userId: this.$stateParams.userId });
  }

  amendOrder() {
    this.openNewTab();
    this.cancelOrder()
      .then(order => {
        this.openReorder();
      }, err => {
        this.closeReorderTab();
      });
  }

  cancelOrder() {
    if (!this.order) {
      return this.showError();
    }

    return this.$q((resolve, reject) => {
      let order = new Preoday.Order.constructor(this.order);
      order.statusReason = 'Cancelled by user';
      delete order.venue;
    
      this.Spinner.show('cancel-order');
      order.cancel()
        .then(cancelledOrder => {
          Object.keys(cancelledOrder).forEach((key) => (cancelledOrder[key] == null) && delete cancelledOrder[key]);
          Object.assign(this.order, cancelledOrder);
          this.Spinner.hide('cancel-order');
          resolve(cancelledOrder);
        }, error => {
          this.Spinner.hide('cancel-order');
          this.showError();
          reject(error);
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
    this.openReorder();
  }

  openNewTab() {
    this.newTab = this.$window.open('', '_blank');
    this.newTab.document.write('Loading...');
  }

  openReorder() {
    let path = this.$window._PREO_DATA._WEBORDERS;
    
    if (this.order.permalink) {
      path += this.order.permalink + '?';
    } else {
      path += '?venueId=' + this.order.venueId + '&';
    }

    path += 'orderId=' + this.order.id;

    this.newTab.location.href = path;
  }

  closeReorderTab() {
    this.newTab.close();
  }

  constructor($window, $state, $stateParams, $q, Spinner, DialogService, LabelService, ErrorService) {
    "ngInject";

    this.$window = $window;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$q = $q;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
  }
}
