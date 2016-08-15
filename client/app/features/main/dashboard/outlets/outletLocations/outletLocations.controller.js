
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

  buildUri () {
// console.log('state parameter here', this.$stateParams);
    let _outletLocations = this.$stateParams.outletLocation && this.$stateParams.outletLocation.split('/') || [];
    let breadcumbs = [{
      group: {
        id: null,
        label: 'Outlet configuration',
      },
      url: this.$state.href('main.dashboard.outlets.location', {
        outletLocation: ''
      }).replace(/~2F/g, "/")
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
          }).replace(/~2F/g, "/")
        });
      }
    }

    breadcumbs[breadcumbs.length - 1].isLast = true;
    this.breadcumbs = breadcumbs;

    this.outletGroup = Preoday.OutletLocationGroup.getGroupById(breadcumbs[breadcumbs.length - 1].group.id);

    if (!this.outletGroup) {
      if (this.data.rootGroup && this.data.rootGroup.outletLocations.length) {
        this.outletGroup = this.data.rootGroup.outletLocations[0].getGroup();

        let breadcumbGroup = breadcumbs.filter((item) => {
          
          return item.group.id === this.outletGroup.id;
        });

        if (breadcumbGroup.length) {
          this.$location.path(breadcumbGroup[0].url.replace('#/', ''));
          return;
        } else {
          this.$location.path(breadcumbs[0].url.replace('#/', ''));
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
        this.$location.path(breadcumbs[0].url.replace('#/', ''));
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
      this.$location.path(this.breadcumbs[this.breadcumbs.length - 2].url.replace('#/', ''));
    } else {
      this.createEmptyGroup();

      this.data.rootGroup = null;
    }
  }


  constructor(contextual, Spinner, $scope, $timeout, $q, $state, $location, $stateParams, BroadcastEvents, VenueService, OutletLocationService, OutletService) {
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
