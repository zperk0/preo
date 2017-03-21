
export default class venueDetailsController {
  static get UID(){
    return "venueDetailsController"
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
        //delete this.venue.ccySymbol;       
        //this.venue.update()
      
        this.VenueService.updateVenue()
        .then((venue)=>{       
          angular.extend(this.VenueService.currentVenue, venue);
         // angular.extend(this.venue,venue);
    
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
    this.Spinner.show("venue-details");
    this.venue = this.VenueService.currentVenue;    
      
    this.showMap = true;

    this.$timeout(()=>{
      console.log(this.venue);
      this.Spinner.hide("venue-details");
    })   
    
  }

  /* @ngInject */
  constructor(Spinner, Snack, MapsService, ErrorService, LabelService, $timeout, VenueService, DialogService, gettextCatalog, $state) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.MapsService = MapsService;
    this.VenueService = VenueService;
    this.LabelService = LabelService;
    this.isError = false;
    this.isSaving = false;
    this.$timeout = $timeout;
    this.debounceTimeout = null;
  
    this.isEdit = false;   
    this.$state = $state;
    this.gettextCatalog = gettextCatalog;
    this.DialogService = DialogService;     
    this.showMap = false;
    this.isMapLoaded = false; 

    this.init();
  }
}
