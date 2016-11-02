
export default class venueServicesController {
  static get UID(){
    return "venueServicesController"
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
    this.init();
  }
}
