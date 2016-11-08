
export default class venueDeliveryZonesController {
  static get UID(){
    return "venueDeliveryZonesController"
  }

  mapLoaded(){
    this.$timeout(()=>{
      this.isMapLoaded = true;
    });
  }

  validateVenue(){
    if (!this.venue.address1){
       this.DialogService.show(this.ErrorService.VENUE_WITHOUT_ADDRESS.title, this.ErrorService.VENUE_WITHOUT_ADDRESS.message, [{
        name: this.gettextCatalog.getString('Got it')
      }])
          .then(()=>{
            this.$state.go('main.dashboard.venueSettings.venueDetails');
          });
    } else if (!this.venue.latitude || !this.venue.longitude){
      this.DialogService.show(this.ErrorService.VENUE_WITHOUT_LOCATION.title, this.ErrorService.VENUE_WITHOUT_LOCATION.message, [{
          name: this.gettextCatalog.getString('Got it')
        }])
        .then(()=>{
        this.$state.go('main.dashboard.venueSettings.venueLocation');
      });
    }
     else {
      this.showMap = true;

   }
   this.$timeout(()=>{
      this.showDeliveryZonesDrawer=true;
      this.Spinner.hide("venue-delivery-zones");
    })
  }

  init(){
    this.Spinner.show("venue-delivery-zones");
    this.venue = this.VenueService.currentVenue ;
    //TODO load delivery zones
    this.validateVenue();
  }

  /* @ngInject */
  constructor($scope, Spinner, $state, Snack, ErrorService, DeliveryZoneService, LabelService, $timeout, VenueService, contextual, DialogService, gettextCatalog) {
    "ngInject";
    this.$scope = $scope;
    this.isEdit = false;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$state = $state;
    this.ErrorService = ErrorService;
    this.DeliveryZoneService = DeliveryZoneService;
    this.gettextCatalog = gettextCatalog;
    this.DialogService = DialogService;
    this.VenueService = VenueService;
    this.LabelService = LabelService;
    this.isError = false;
    this.$timeout = $timeout;
    this.showMap = false
    this.isMapLoaded=false;
    this.contextual = contextual;
    this.showDeliveryZonesDrawer=false;
    this.init();
  }
}
