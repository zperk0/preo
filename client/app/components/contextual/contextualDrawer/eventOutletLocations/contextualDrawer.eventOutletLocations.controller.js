export default class ContextualDrawerEventOutletLocationsController {
  static get UID(){
    return "ContextualDrawerEventOutletLocations";
  }

  close(){

    this.selectedOutletLocation = null;
    this.contextualDrawer.cancel();
  }

  fetchOutletLocations() {

    this.OutletLocationService.getOutletLocations({
      venueId: this.StateService.venue.id
    }).then((data) => {

      this.data = data;
    }, (err) => {

      this.data = {};
    });
  }

  selectOutletLocation (outletLocation) {

    this.selectedOutletLocation = outletLocation;
  }

  done () {

    var outletLocation = this.selectedOutletLocation;

    this.selectedOutletLocation = null;

    this.contextualDrawer.success(outletLocation);
  }

  constructor($scope, OutletLocationService, StateService, BroadcastEvents, $stateParams,contextualDrawer, Snack) {
    "ngInject";
    this.OutletLocationService = OutletLocationService;
    this.StateService = StateService;
    this.contextualDrawer = contextualDrawer;
    this.Snack = Snack;
    this.selectedOutletLocation = null;

    this.fetchOutletLocations();
    // if (VenueService.hasVenueSet()) {
    //   this.fetchOutletLocations();
    // } else {
    //   $scope.$on(BroadcastEvents.ON_CURRENT_VENUE, (event, venue) => {

    //     this.fetchOutletLocations();
    //   });
    // }
  }
}
