
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

      this.buildUri();

      console.log('this.outletLocations', this.outletLocations);
    }, (err) => {
console.log('errrrr', err);
      this.outletLocations = [];
    });    
  }

  buildUri () {
console.log('state parameter here', this.$stateParams);
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

    console.log('all outlets splitted', _outletLocations);

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

    console.log('all breadcambs', breadcumbs);

    breadcumbs[breadcumbs.length - 1].isLast = true;
    this.breadcumbs = breadcumbs;

    this.outletGroup = Preoday.OutletLocationGroup.getGroupById(breadcumbs[breadcumbs.length - 1].group.id);

    if (!this.outletGroup) {
      this.outletGroup = this.outletLocations[0].getGroup();
console.log(this.outletGroup, breadcumbs);
      let breadcumbGroup = breadcumbs.filter((item) => {
        
        return item.group.id === this.outletGroup.id;
      });
console.log('breadcumbGroup', breadcumbGroup);
      if (breadcumbGroup.length) {
        alert('redirect 1')
        this.$location.path(breadcumbGroup[0].url.replace('#/', ''));
        // this.$state.reload();
        return;
      } else {
        alert('redirect 2')
        this.$location.path(breadcumbs[0].url.replace('#/', ''));
        // this.$state.reload();
        return;        
      }
    }


    this.$timeout(() => {

      let browserUrl = window.location.hash.replace(/~2F/g, "/");

      if (breadcumbs[breadcumbs.length - 1].url !== browserUrl) {
        alert('redirect 3')
        console.log('redirecting here', breadcumbs[0].url, breadcumbs[breadcumbs.length - 1].url, browserUrl);
        this.$location.path(breadcumbs[0].url.replace('#/', ''));
        // this.$state.reload();
        return;         
      }
    });
  }


  constructor(contextual, $scope, $timeout, $state, $location, $stateParams, BroadcastEvents, VenueService, OutletLocationService) {
    "ngInject";

    this.$timeout = $timeout;
    this.$state = $state;
    this.$location = $location;
    this.$stateParams = $stateParams;
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
