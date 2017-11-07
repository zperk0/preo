
export default class paymentsController {
  static get UID(){
    return "paymentsController";
  }

  canTurnOffMethod(){
    var requiredCount = 1;
    var onCount = 0;
    if (this.venue.cashFlag){
      onCount++;
    }

    if (this.stripe && this.stripe.id && this.stripe.visible){
      onCount++;
    }

    if (onCount >= requiredCount){
      return true;
    }

    this.$timeout(() => {
      this.DialogService.show(this.ErrorService.ONE_PAYMENT_METHOD.title, this.ErrorService.ONE_PAYMENT_METHOD.message, [
        {name: this.LabelService.CONFIRMATION}
      ]);
    });

    return false;
  }

  showStripeSuccess(){
    this.$connecting = false;
    this.DialogService.show(this.LabelService.TITLE_STRIPE_CONNECTED, this.LabelService.CONTENT_STRIPE_CONNECTED, [
      {name: this.LabelService.CONFIRMATION}
    ]).then(() => {
      this.$window.location.reload();
    });
  }

  showStripeError() {
    this.$connecting = false;
    this.DialogService.show(this.ErrorService.STRIPE_ERROR.title, this.ErrorService.STRIPE_ERROR.message, [
      {name: this.LabelService.CONFIRMATION}
    ]);
  }

  confirmStripe(url) {
    console.log('[PaymentsController] confirmStripe', url);
    if (url && url.indexOf('code') !== -1 && url.indexOf('state') !== -1) {
      var spl = url.split('?')[1].split('&');
      var state = '';
      var code = '';
      spl.forEach((ea)=>{
         if (ea.indexOf("state") === 0){
          state = ea.split("=")[1]
         }
         if (ea.indexOf("code") === 0){
          code = ea.split("=")[1]
         }
      });

      this.Spinner.show('venue-payments-save');
      Preoday.PaymentProvider.auth(code, state)
        .then((response) => {
          console.log('[PaymentsController] response', response);
          this.showStripeSuccess();
        }, (err) => {
          this.showStripeError();
        }).finally(() => {
          this.Spinner.hide('venue-payments-save');
        });
    } else {
      this.showStripeError();
    }
  }

  goToStripe(){
    this.$window.open(this.stripeLink);
  }

  connectToStripe(){
    console.log('[PaymentsController] connectToStripe:', this.stripeLink);
    if (this.$connecting) {
      return;
    }

    this.$connecting = true;

    this.stripeWindowReference = this.$window.open(this.stripeLink);
    this.stripeTimer = this.$window.setInterval(() => {
      if (this.stripeWindowReference.closed) {
        this.$window.clearInterval(this.stripeTimer);
        this.showStripeError();
      }
    }, 200);
  }

  updateStripe() {
    if (this.stripe && this.stripe.id) {
      if (this.stripe.visible === 0 && !this.canTurnOffMethod()) {
        this.stripe.visible = 1;
        return;
      }

      this.Spinner.show("venue-payments-save");
      this.stripe.update(this.venue.id)
        .then(() => {
          this.Snack.show(this.LabelService.SNACK_VENUE_PAYMENTS_SUCCESS)
          this.Spinner.hide("venue-payments-save");
        },() => {
          this.Snack.show(this.LabelService.SNACK_VENUE_PAYMENTS_SUCCESS)
          this.Spinner.hide("venue-payments-save");
        });
    }
  }

  setStripe(){
    for (var i = 0; i < this.paymentProviders.length; i++) {
      var pp = this.paymentProviders[i];
      if (pp.type === 'Stripe'){
        this.stripe = pp;
        this.stripeLink = 'https://stripe.com';
        return;
      }
    }
  }

  updateVenue(){
      if (this.venue.cashFlag === 0 && !this.canTurnOffMethod()){
        this.venue.cashFlag = 1;
        return;
      }

      this.Spinner.show("venue-payments-save");

      try {
        this.VenueService.updateVenue()
          .then((venue) => {
            angular.extend(this.venue,venue);
            this.Spinner.hide("venue-payments-save");
            this.Snack.show(this.LabelService.SNACK_VENUE_PAYMENTS_SUCCESS)
          }, (err) => {
            console.error("venue-services" ,err);
            this.Spinner.hide("venue-payments-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_PAYMENTS_ERROR)
          }).catch((err) => {
            console.error("venue-services err",err)
            this.Spinner.hide("venue-payments-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_PAYMENTS_ERROR)
          });
      } catch (e) {
        console.error(e);
        this.Spinner.hide("venue-payments-save");
        this.Snack.showError(this.LabelService.SNACK_VENUE_PAYMENTS_ERROR)
      }
  }

  onUpdateStorage(ev) {
    if (ev.key !== this.stripeStorageKey) {
      return;
    }

    const url = this.$window.localStorage.getItem(this.stripeStorageKey);

    if (this.stripeWindowReference) {
      this.$window.clearInterval(this.stripeTimer);
      this.stripeWindowReference.close();
    }

    if (!url || url.indexOf('/stripe-success') === -1) {
      this.$connecting = false;
      return;
    }

    this.$window.localStorage.removeItem(this.stripeStorageKey);
    this.confirmStripe(url);
  }

  onInit() {
    this.Spinner.show("venue-details");
    this.venue = this.VenueService.currentVenue;
    Preoday.PaymentProvider.getStripeConnectLink(this.venue.id, this.stripeRedirectUri)
      .then((stripeLink)=>{
        this.stripeLink = stripeLink;
      });

    this.venue.getPaymentProviders()
      .then((paymentProviders) => {
        this.paymentProviders = paymentProviders;
        this.setStripe();
        this.Spinner.hide("venue-details");
      }, () => {
        this.Spinner.hide("venue-details");
      }).catch((error) => {
        this.Spinner.hide("venue-details");
        console.error('error', error)
      });

    this.$window.addEventListener('storage', this.onUpdateStorage.bind(this), false);
  }

  onDestroy() {
    this.$window.removeEventListener('storage', this.onUpdateStorage.bind(this), false);
    this.$window.localStorage.removeItem(this.stripeStorageKey);
  }

  /* @ngInject */
  constructor(Spinner, Snack, ErrorService, LabelService, DialogService, $scope, $window, $timeout, VenueService) {
    'ngInject';
    this.isEdit = false;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.VenueService = VenueService;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.isError = false;
    this.$window = $window;
    this.$timeout = $timeout;
    this.stripeLink = 'https://stripe.com';
    this.stripeStorageKey = 'STRIPE_REDIRECT';
    this.stripeRedirectUri = $window.location.origin + $window.location.pathname;

    if (this.stripeRedirectUri[this.stripeRedirectUri.length - 1] !== '/') {
      this.stripeRedirectUri += '/';
    }

    this.stripeRedirectUri += 'stripe-success.php';
    console.log(this.stripeRedirectUri);
    this.paymentProviders = [];
    this.stripe = {visible: false};
    this.onInit();

    $scope.$on('$destroy', this.onDestroy.bind(this));
  }
}
