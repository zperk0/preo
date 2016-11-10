
export default class venueDetailsController {
  static get UID(){
    return "venueDetailsController"
  }

  submit(){
    if (this.venueDetailsForm.$valid){
      this.Spinner.show("venue-details-save");
      try {
        console.log("getting location");
        this.MapsService.getGeoLocationByAddress(this.venue)
        .then((location)=>{
          this.venue.latitude = location.lat();
          this.venue.longitude = location.lng();
          console.log("got location");
        },()=>{
          console.log("error getting location");
          //if the user put a crazy address that google can't find, just leave it blank and it'll be handled in the location page afterwards
        }).then(()=>{
          return this.VenueService.updateVenue();
        })
        .then((venue)=>{
          angular.extend(this.venue,venue);
          return this.venue.settings.update()
        })
        .then((settings)=>{
          angular.extend(this.venue.settings,settings);
            this.toggleEdit();
            this.Spinner.hide("venue-details-save");
            this.Snack.show(this.LabelService.SNACK_VENUE_DETAILS_SUCCESS)
          }, (err)=>{
            console.error("venue-details" ,err);
            this.Spinner.hide("venue-details-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_DETAILS_ERROR)
          }).catch((err)=>{
            console.error("venue-details err",err)
            this.Spinner.hide("venue-details-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_DETAILS_ERROR)
            })
      } catch(e){
        console.error(e)
        this.Spinner.hide("venue-details-save");
        this.Snack.showError(this.LabelService.SNACK_VENUE_DETAILS_ERROR)
      }
    }
  }

  toggleEdit(){
    this.isEdit = !this.isEdit;
  }

  init(){
    this.Spinner.show("venue-details");
    this.venue = this.VenueService.currentVenue ;
    this.$timeout(()=>{
      console.log(this.venue);
      this.Spinner.hide("venue-details");
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
    this.init();
  }
}
