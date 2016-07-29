
export default class outletLocationsController {
  static get UID(){
    return "outletLocationsController";
  }

  toggleDrawer(id){

  	console.log('here');
    this.contextual.showDrawer(id);
  }  

  fetchOutlets() {

    this.OutletLocationService.getOutletLocations({
      venueId: this.VenueService.currentVenue.id
    }).then((data) => {

      this.outletLocations = data.outletLocations;

      console.log('this.outletLocations', this.outletLocations);
    }, (err) => {

      this.outletLocations = [];
    });    
  }


  constructor(contextual, $scope, $stateParams, BroadcastEvents, VenueService, OutletLocationService) {
    "ngInject";

    this.contextual = contextual;
    this.VenueService = VenueService;
    this.OutletLocationService = OutletLocationService;

    if (VenueService.hasVenueSet()) {
      this.fetchOutlets();
    } else {
      $scope.$on(BroadcastEvents.ON_CURRENT_VENUE, (event, venue) => {
        
        this.fetchOutlets();
      });
    }
  }
}
