export default class contextualDrawerOutletLocationsController {
  static get UID(){
    return "ContextualDrawerOutletLocations";
  }

  close(){
    this.$mdSidenav('outletLocationss').close()
      .then(function () {
        console.log("close Modifiers is done");
      });

  }

  fetchOutletLocations() {

    this.OutletLocationService.getOutletLocations({
      venueId: this.VenueService.currentVenue.id
    }).then((data) => {

      this.data = {
        outletLocations: Preoday.OutletLocationGroup.getGroupById(null).outletLocations
      };

      console.log('this.outletLocations in drawer', this.data);
    }, (err) => {
console.log('errrrr', err);
      this.data = {};
    });        
  }

  constructor($scope, OutletLocationService, VenueService, BroadcastEvents, $stateParams,$mdSidenav) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;  
    this.OutletLocationService = OutletLocationService;  
    this.VenueService = VenueService;  

    if (VenueService.hasVenueSet()) {
      this.fetchOutletLocations();
    } else {
      $scope.$on(BroadcastEvents.ON_CURRENT_VENUE, (event, venue) => {
        
        this.fetchOutletLocations();
      });
    }    
  }
}
