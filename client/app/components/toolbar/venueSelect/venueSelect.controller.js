export default class venueSelectController {
  static get UID(){
    return "venueSelectController";
  }

  openMenu ($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  switchVenue (venue) {
    let venueId = venue.id;
    this.$state.go("main.dashboard",{venueId});
    this.$timeout(()=>{
      window.location.reload();
    })
  }

  setVenue(){
    this.$timeout(()=>{
      this.venues = this.VenueService.venues;
      this.venue = this.VenueService.currentVenue;
    });
  }


  constructor($rootScope, BroadcastEvents, $timeout, VenueService, $stateParams, $state) {
    "ngInject";
    this.$timeout = $timeout;
    this.VenueService = VenueService;
    this.$state = $state;
    $rootScope.$on(BroadcastEvents._ON_FETCH_VENUES,(event,venues)=>{
      this.setVenue();
    });

    this.setVenue();

  }
}
