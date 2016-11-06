
export default class venueServicesController {
  static get UID(){
    return "venueServicesController"
  }

  loadDeliveryZones(){
     this.$state.go("main.dashboard.venueSettings.venueDeliveryZones");
  }

  updateVenue(){
      this.Spinner.show("venue-services-save");
      try {
        this.VenueService.updateVenue()
        .then((venue)=>{
          angular.extend(this.venue,venue);
            this.Spinner.hide("venue-services-save");
            this.Snack.show(this.LabelService.SNACK_VENUE_SERVICES_SUCCESS)
          }, (err)=>{
            console.error("venue-services" ,err);
            this.Spinner.hide("venue-services-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
          }).catch((err)=>{
            console.error("venue-services err",err)
            this.Spinner.hide("venue-services-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
            })
      } catch(e){
        console.error(e)
        this.Spinner.hide("venue-services-save");
        this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
      }
  }

   updateVenueSettings(){

      if (!this.collectionForm.$valid) {
        return;
      }


      this.Spinner.show("venue-services-save");
      try {
        this.venue.settings.update()
        .then((settings)=>{
          angular.extend(this.venue.settings,settings);
            this.Spinner.hide("venue-services-save");
            this.Snack.show(this.LabelService.SNACK_VENUE_SERVICES_SUCCESS)
          }, (err)=>{
            console.error("venue-services" ,err);
            this.Spinner.hide("venue-services-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
          }).catch((err)=>{
            console.error("venue-services err",err)
            this.Spinner.hide("venue-services-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
            })
      } catch(e){
        console.error(e)
        this.Spinner.hide("venue-services-save");
        this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
      }
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
  constructor(Spinner, $state, Snack, ErrorService, LabelService, $timeout, VenueService) {
    "ngInject";
    this.isEdit = false;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$state = $state;
    this.ErrorService = ErrorService;
    this.VenueService = VenueService;
    this.LabelService = LabelService;
    this.isError = false;
    this.$timeout = $timeout;
    this.init();
  }
}
