
export default class paymentsController {
  static get UID(){
    return "paymentsController";
  }

  showStripeSuccess(){
      this.DialogService.show(this.LabelService.TITLE_STRIPE_CONNECTED, this.LabelService.CONTENT_STRIPE_CONNECTED, [{
        name: this.LabelService.CONFIRMATION
      }]).then(()=>{
        window.location.reload();
      })
  }

  showStripeError(){
      this.DialogService.show(this.ErrorService.STRIPE_ERROR.title, this.ErrorService.STRIPE_ERROR.message, [{
        name: this.LabelService.CONFIRMATION
      }]);
  }
  confirmStripe(url){
    if (url.indexOf("code") !== -1 && url.indexOf("state") !== -1){
      var spl = url.split("?")[1].split("&");
      var state = '';
      var code = '';
      spl.forEach((ea)=>{
         if (ea.indexOf("state") === 0){
          state = ea.split("=")[1]
         }
         if (ea.indexOf("code") === 0){
          code = ea.split("=")[1]
         }
      })
      Preoday.PaymentProvider.auth(code, state)
        .then((response)=>{
          console.log('response', response);
          this.showStripeSuccess();
        }, (err)=>{
          this.showStripeError();
      });
    } else {
      this.showStripeError();
    }
  }

  connectToStripe(){
    console.log("opening", this.stripeLink);
    var myWindow = window.open(this.stripeLink);
    var url = '';
    //Check if user close tab before Authorize or Cancel payment
     var timer = setInterval(() =>{
        if (myWindow.closed) {
            clearInterval(timer);
            this.confirmStripe(url);
        } else {
          console.log("got url", myWindow.location.href )
          if (myWindow.location.href.indexOf("stripe-success") != -1){
             url = myWindow.location.href;
           }
        }
     }, 199);
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
  constructor(Spinner, Snack, MapsService, ErrorService, LabelService, DialogService, $timeout, VenueService) {
    "ngInject";
    this.isEdit = false;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.MapsService = MapsService;
    this.VenueService = VenueService;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.isError = false;
    this.$timeout = $timeout;
    this.stripeLink = '';
    this.stripeRedirectUri = window.location.origin + window.location.pathname;
    if (this.stripeRedirectUri[this.stripeRedirectUri.length-1] !== '/'){
      this.stripeRedirectUri += "/"
    }
    this.stripeRedirectUri +="stripe-success.php";
    console.log(this.stripeRedirectUri)
    this.paymentProviders = []
    this.stripe = {visible:false};
    this.init();
  }
}
