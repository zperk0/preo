
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

      if (this.outletLocations && this.outletLocations.length) {
        this.outletGroup = this.outletLocations[0].getGroup();

        console.log('group here', this.outletGroup);
      }

      console.log('this.outletLocations', this.outletLocations);
    }, (err) => {
console.log('errrrr', err);
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
