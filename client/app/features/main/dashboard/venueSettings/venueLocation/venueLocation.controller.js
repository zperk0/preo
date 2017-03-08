
export default class venueLocationController {
  static get UID(){
    return "venueLocationController"
  }

  onMarkerDrop(lat,lng){
    if (lat && lng){
      this.venue.latitude = lat;
      this.venue.longitude = lng;
      this.submit();
    }
  }


  submit(){
      this.Spinner.show("venue-LOCATION-save");
      try {
        this.VenueService.updateVenue()
        .then((venue)=>{
          angular.extend(this.venue,venue);
            this.Spinner.hide("venue-LOCATION-save");
            this.Snack.show(this.LabelService.SNACK_VENUE_LOCATION_SUCCESS)
          }, (err)=>{
            console.error("venue-LOCATION" ,err);
            this.Spinner.hide("venue-LOCATION-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_LOCATION_ERROR)
          }).catch((err)=>{
            console.error("venue-LOCATION err",err)
            this.Spinner.hide("venue-LOCATION-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_LOCATION_ERROR)
            })
      } catch(e){
        console.error(e)
        this.Spinner.hide("venue-LOCATION-save");
        this.Snack.showError(this.LabelService.SNACK_VENUE_LOCATION_ERROR)
      }
  }

  mapLoaded(){
    this.$timeout(()=>{
      this.isMapLoaded = true;
    });
  }

  init(){
    this.Spinner.show("venue-location");
    this.venue = this.VenueService.currentVenue;
    if (this.venue.address1){
      this.showMap = true;
    } else {
      this.DialogService.show(this.ErrorService.VENUE_WITHOUT_ADDRESS.title, this.ErrorService.VENUE_WITHOUT_ADDRESS.message, [{
        name: this.gettextCatalog.getString('Got it')
      }])
        .then(()=>{
          this.$state.go('main.dashboard.venueSettings.venueDetails');
        });
    }
    this.$timeout(()=>{
      this.Spinner.hide("venue-location");
    })
    console.log('location controller init');
  }


  /* @ngInject */
  constructor(Spinner, Snack, ErrorService, LabelService, $timeout, VenueService, DialogService, gettextCatalog, $state) {
    "ngInject";
    this.isEdit = false;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$state = $state;
    this.gettextCatalog = gettextCatalog;
    this.ErrorService = ErrorService;
    this.VenueService = VenueService;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.isError = false;
    this.$timeout = $timeout;
    this.showMap = false;
    this.isMapLoaded = false;
    this.init();
  }
}
