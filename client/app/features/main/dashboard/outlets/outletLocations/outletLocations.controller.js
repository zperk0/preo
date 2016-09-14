
export default class outletLocationsController {
  static get UID(){
    return "outletLocationsController";
  }

  toggleDrawer(id){

  	console.log('here');
    this.contextual.showDrawer(id);
  }

  hideSpinner () {

    this.Spinner.hide("outletLocations");
  }

  fetchOutlets() {


    this.$q.all([
        this.OutletLocationService.getOutletLocations({
          venueId: this.VenueService.currentVenue.id
        }),
        this.OutletService.getOutlets({
          venueId: this.VenueService.currentVenue.id
        })
      ]).then((results) => {

        this.data = results[0];

        this.buildUri();
      }, (err) => {

      this.outletLocations = [];
      this.hideSpinner();
    });
  }

  getBreadcumbTitle (breadcumb) {
    if (!breadcumb.group.id) {
      if (breadcumb.group.label) {
        return breadcumb.group.label;
      }

      return this.gettextCatalog.getString('Outlet configuration');
    }

    if (breadcumb.group.owner) {
      return breadcumb.group.owner.name;
    }

    return breadcumb.group.label || this.gettextCatalog.getString('Location label');
  }

  buildUri () {
// console.log('state parameter here', this.$stateParams);
    let _outletLocations = this.$stateParams.outletLocation && this.$stateParams.outletLocation.split('/') || [];
    let breadcumbs = [{
      group: this.data.rootGroup,
      url: this.$state.href('main.dashboard.outlets.location', {
        outletLocation: ''
      }).replace(/~2F/g, "/"),
      stateParams: ''
    }];

    for (var i = 0, len = _outletLocations.length; i < len; i++) {
      // get name by id _outletLocations[i]
      console.log(_outletLocations.slice(0, i+1), _outletLocations.slice(0, i).join('/'));

      let group = Preoday.OutletLocationGroup.getGroupById(_outletLocations[i]);
      if (group) {
        breadcumbs.push({
          group: group,
          url: this.$state.href('main.dashboard.outlets.location', {
            outletLocation: _outletLocations.slice(0, i+1).join('/')
          }).replace(/~2F/g, "/"),
          stateParams: _outletLocations.slice(0, i+1).join('/')
        });
      }
    }

    breadcumbs[breadcumbs.length - 1].isLast = true;
    this.breadcumbs = breadcumbs;

    console.log('breadcumbs', breadcumbs);

    this.outletGroup = Preoday.OutletLocationGroup.getGroupById(breadcumbs[breadcumbs.length - 1].group.id);

    if (!this.outletGroup) {
      if (this.data.rootGroup && this.data.rootGroup.outletLocations.length) {
        this.outletGroup = this.data.rootGroup.outletLocations[0].getGroup();

        let breadcumbGroup = breadcumbs.filter((item) => {

          return item.group.id === this.outletGroup.id;
        });

        if (breadcumbGroup.length) {
          this.setPath(breadcumbGroup[0].url.replace('#/', ''));
          this.hideSpinner();
          return;
        } else {
          this.setPath(breadcumbs[0].url.replace('#/', ''));
          this.hideSpinner();
          return;
        }
      } else {
        this.createEmptyGroup();
      }
    } else if (!this.outletGroup.id && (!this.data.rootGroup || !this.data.rootGroup.outletLocations.length)) {
      this.createEmptyGroup();
    }


    this.$timeout(() => {

      let browserUrl = window.location.hash.replace(/~2F/g, "/");

      if (breadcumbs[breadcumbs.length - 1].url !== browserUrl) {
        this.setPath(breadcumbs[0].url.replace('#/', ''));
        this.hideSpinner();
        return;
      }

      this.loaded = true;

      this.hideSpinner();
    });
  }

  createEmptyGroup() {

    delete this.outletGroup;
  }

  groupDeleted () {

    if (this.breadcumbs.length > 1) {
      this.setPath(this.breadcumbs[this.breadcumbs.length - 2].url.replace('#/', ''));
    } else {
      this.createEmptyGroup();

      this.data.rootGroup = null;
    }
  }

  setPath(path) {

    this.$location.path(path);
  }

  getUrl(url){
    return window.location.pathname+url;
  }

  constructor(contextual, Spinner, $scope, $timeout, $q, $state, $location, $stateParams, BroadcastEvents, VenueService, OutletLocationService, OutletService, gettextCatalog) {
    "ngInject";

    this.$q = $q;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$location = $location;
    this.$stateParams = $stateParams;
    this.contextual = contextual;
    this.VenueService = VenueService;
    this.OutletLocationService = OutletLocationService;
    this.OutletService = OutletService;
    this.Spinner = Spinner;
    this.gettextCatalog = gettextCatalog;
    this.loaded = false;

    this.Spinner.show("outletLocations");

    if (VenueService.hasVenueSet()) {
      this.fetchOutlets();
    } else {
      $scope.$on(BroadcastEvents.ON_CURRENT_VENUE, (event, venue) => {

        this.fetchOutlets();
      });
    }
  }
}
