
export default class paymentsController {
  static get UID(){
    return "paymentsController";
  }

  connectToStripe(){
    window.open(this.stripeLink);
  }

  updateStripe(){
    if (this.stripe && this.stripe.id){
      this.Spinner.show("venue-payments-save");
        this.stripe.update()
          .then(()=>{
            this.Snack.show(this.LabelService.SNACK_VENUE_PAYMENTS_SUCCESS)
            this.Spinner.hide("venue-payments-save");
          },()=>{
            this.Snack.show(this.LabelService.SNACK_VENUE_PAYMENTS_SUCCESS)
            this.Spinner.hide("venue-payments-save");
          })
    }
  }

  setStripe(){
    for (var i=0;i<this.paymentProviders.length;i++){
      var pp = this.paymentProviders[i];
      if (pp.type === 'Stripe'){
        this.stripe = pp;
        return;
      }
    }
  }

  updateVenue(){
      this.Spinner.show("venue-payments-save");
      try {
        this.VenueService.updateVenue()
        .then((venue)=>{
          angular.extend(this.venue,venue);
            this.Spinner.hide("venue-payments-save");
            this.Snack.show(this.LabelService.SNACK_VENUE_PAYMENTS_SUCCESS)
          }, (err)=>{
            console.error("venue-services" ,err);
            this.Spinner.hide("venue-payments-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_PAYMENTS_ERROR)
          }).catch((err)=>{
            console.error("venue-services err",err)
            this.Spinner.hide("venue-payments-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_PAYMENTS_ERROR)
            })
      } catch(e){
        console.error(e)
        this.Spinner.hide("venue-payments-save");
        this.Snack.showError(this.LabelService.SNACK_VENUE_PAYMENTS_ERROR)
      }
  }

  init(){
    this.Spinner.show("venue-details");
    this.venue = this.VenueService.currentVenue ;
    this.account = this.VenueService.account;
    Preoday.PaymentProvider.getStripeConnectLink(this.account.id, this.stripeRedirectUri).then((stripeLink)=>{
      this.stripeLink = stripeLink;
    })
    this.account.getPaymentProviders().then((paymentProviders)=>{
      this.paymentProviders = paymentProviders;
      this.setStripe();
      this.Spinner.hide("venue-details");
    },()=>{
      this.Spinner.hide("venue-details");
    }).catch((error)=>{
      console.error('error', error)
    })
  }

  /* @ngInject */
  constructor(Spinner, Snack, MapsService, ErrorService, LabelService, $timeout, VenueService) {
    "ngInject";
    this.isEdit = false;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.MapsService = MapsService;
    this.VenueService = VenueService;
    this.LabelService = LabelService;
    this.isError = false;
    this.$timeout = $timeout;
    this.stripeLink = '';
    // this.stripeRedirectUri = window.location.origin + '/#/stripeSuccess';
    this.stripeRedirectUri = "http://local.app-v2.preoday.com/stripe-success.php";
    this.paymentProviders = []
    this.stripe = {visible:false};
    this.init();
  }
}
