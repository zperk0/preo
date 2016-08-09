export default class contextualDrawerOutletLocationsController {
  static get UID(){
    return "ContextualDrawerOutletLocations";
  }

  close(){

    this.selectedOutletLocation = null;
    this.contextualDrawer.cancel();
  }

  fetchOutletLocations() {

    this.OutletLocationService.getOutletLocations({
      venueId: this.VenueService.currentVenue.id
    }).then((data) => {

      this.data = data;

      console.log('this.outletLocations in drawer', this.data);
    }, (err) => {
console.log('errrrr', err);
      this.data = {};
    });        
  }

  selectOutletLocation (outletLocation) {

    let outletLocationToMove = this.OutletLocationService.getOutletLocationToMove();
    
    if (outletLocationToMove.id === outletLocation.id) {
      this.Snack.showError('You need select a different outlet location destination');
      return;
    }
    
    if (outletLocation.path && outletLocation.path.indexOf('/' + outletLocationToMove.id + '/') !== -1) {
      this.Snack.showError('You need select a different outlet location destination');
      return;
    }

    if (!outletLocation.isGroup && outletLocation.isSeat()) {
      this.Snack.showError('You can not add children for seat outlet location');
      return;      
    }

    this.selectedOutletLocation = outletLocation;
  }

  move () {

    let groupToMove = null;

    if (this.selectedOutletLocation.isGroup) {
      groupToMove = Preoday.OutletLocationGroup.getGroupById(null);
    } else {
      groupToMove = this.selectedOutletLocation.createGroup();
    }

    this.selectedOutletLocation = null;
    this.contextualDrawer.success(groupToMove);
  }

  constructor($scope, OutletLocationService, VenueService, BroadcastEvents, $stateParams,contextualDrawer, Snack) {
    "ngInject";
    this.OutletLocationService = OutletLocationService;  
    this.VenueService = VenueService;  
    this.contextualDrawer = contextualDrawer;  
    this.Snack = Snack;  
    this.selectedOutletLocation = null;

    if (VenueService.hasVenueSet()) {
      this.fetchOutletLocations();
    } else {
      $scope.$on(BroadcastEvents.ON_CURRENT_VENUE, (event, venue) => {
        
        this.fetchOutletLocations();
      });
    }    
  }
}
