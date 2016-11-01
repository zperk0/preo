
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
      var venueCopy = angular.copy(this.venue);
      delete venueCopy.ccySymbol;
      try {
        venueCopy.update()
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
    console.log("map is loaded");
  }

  init(){
    this.Spinner.show("venue-location");
    this.venue = this.VenueService.currentVenue ;
    this.$timeout(()=>{
      this.showMap = true;
      this.Spinner.hide("venue-location");
    })
  }


  /* @ngInject */
  constructor(Spinner, Snack, ErrorService, LabelService, $timeout, VenueService) {
    "ngInject";
    this.isEdit = false;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.VenueService = VenueService;
    this.LabelService = LabelService;
    this.isError = false;
    this.$timeout = $timeout;
    this.showMap = false;
    this.init();
  }
}
