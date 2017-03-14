export default class venueSelectController {
  static get UID(){
    return "venueSelectController";
  }

  openMenu ($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  switchVenue (venue) {
    let venueId = venue.id;
    this.$state.go('main.dashboard.home' , {venueId} ,  {reload: true});
    this.$timeout(()=>{
      window.location.reload();
    },100)
  }

  setVenue(){
    this.$timeout(()=>{
      this.venues = this.VenueService.venues;
      this.venue = this.VenueService.currentVenue;
    });
  }

  showSearch(){
    return this.UserService.isAdmin();
  }

  doSearch(){
    this.Spinner.show('venue-search');
    Preoday.Venue.search(this.searchLabel)
    .then((result)=>{
      if (result && result.length){
        this.venues = result
      }
    },()=>{
      // pass
    }).then(()=>{
      this.Spinner.hide('venue-search')
    })
  }


  constructor($rootScope, BroadcastEvents, $timeout, VenueService, UserService, $stateParams, $state, Spinner) {
    "ngInject";
    this.$timeout = $timeout;
    this.VenueService = VenueService;
    this.$state = $state;
    this.UserService = UserService;
    this.Spinner = Spinner;

    $rootScope.$on(BroadcastEvents._ON_FETCH_VENUES,(event,venues)=>{
      this.setVenue();
    });

    this.setVenue();

  }
}
