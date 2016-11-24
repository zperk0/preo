export default class venueModeSelectController {
  static get UID(){
    return "venueModeSelectController";
  }

  openMenu ($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  setVenueMode(newMode){
    this.Spinner.show("venue-mode");
    function handleSuccess(){
      this.setTranslations(newMode)
      this.Spinner.hide("venue-mode");
    }
    function handleError(error){
      console.log("handling error", error);
      this.Spinner.hide("venue-mode");
      if (error && error.status == 403){
        if (error.message && error.message.indexOf("one payment type")>-1){
           this.DialogService.show(this.ErrorService.VENUE_MODE_PAYMENT.title, this.ErrorService.VENUE_MODE_PAYMENT.message, [{
             name: this.LabelService.CONFIRMATION
          }]);
        } else {
          this.Snack.showError(ErrorService.VENUE_MODE_FAILED.message)
        }
      }
    }
    switch(newMode) {
      case 'live':
        this.venue.setLive().then(handleSuccess.bind(this),handleError.bind(this));
        break;
      case 'demo':
        this.venue.setDemo().then(handleSuccess.bind(this),handleError.bind(this));
        break;
      case 'offline':
        this.venue.setOffline().then(handleSuccess.bind(this),handleError.bind(this));
        break;
    }
  }

  setTranslations(mode){
    this.translatedVenueModeTooltip = this.translations[mode].tooltip;
    this.translatedVenueMode= this.translations[mode].title;
  }

  setVenue(){
    this.$timeout(()=>{
      this.venues = this.VenueService.venues;
      this.venue = this.VenueService.currentVenue;
      this.setTranslations(this.venue && this.venue.liveFlag ? (this.venue.demoFlag ? 'demo' : 'live') : 'offline')
    });
  }


  constructor($rootScope, BroadcastEvents, $timeout, gettextCatalog, VenueService, $stateParams, Spinner, Snack, DialogService,  ErrorService, LabelService) {
    "ngInject";
    this.$timeout = $timeout;
    this.VenueService = VenueService;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.translations={
      live:{
        tooltip:gettextCatalog.getString("You are ready to take orders"),
        title: gettextCatalog.getString("live")
      }, demo:{
        tooltip:gettextCatalog.getString("Dummy orders only. Payments are not processed."),
        title: gettextCatalog.getString("in demo mode")
      }, offline:{
        tooltip:gettextCatalog.getString("You are not accepting orders right now"),
        title:gettextCatalog.getString("offline")
      }
    }
    $rootScope.$on(BroadcastEvents._ON_FETCH_VENUES,(event,venues)=>{
      this.setVenue();
    });

    this.setVenue();

  }
}
