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
      venueId: this.StateService.venue.id
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
      this.Snack.showError(this.gettextCatalog.getString('You need select a different outlet location destination'));
      return;
    }

    if (outletLocation.path && outletLocation.path.indexOf('/' + outletLocationToMove.id + '/') !== -1) {
      this.Snack.showError(this.gettextCatalog.getString('You need select a different outlet location destination'));
      return;
    }

    if (!outletLocation.isGroup && outletLocation.isSeat()) {
      this.Snack.showError(this.gettextCatalog.getString('You can not add children for seat outlet location'));
      return;
    }

    if (outletLocation.outletId) {
      this.Snack.showError(this.gettextCatalog.getString('You can not add children for an outlet location with an outlet'));
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

  constructor($scope, OutletLocationService, StateService, BroadcastEvents, $stateParams,contextualDrawer, Snack, gettextCatalog) {
    "ngInject";
    this.OutletLocationService = OutletLocationService;
    this.StateService = StateService;
    this.contextualDrawer = contextualDrawer;
    this.Snack = Snack;
    this.selectedOutletLocation = null;
    this.gettextCatalog = gettextCatalog;

    this.fetchOutletLocations();
  }
}
