export default class venueSelectController {
  static get UID(){
    return "venueSelectController";
  }

  openMenu ($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  switchVenue (venue) {
    const venueId = venue.id;

    const {
      StateService,
      $timeout,
    } = this;

    StateService.navigateToVenue(venueId);

    $timeout(()=>{
      window.location.reload();
    }, 100);
  }

  setVenue(){

    const {
      StateService,
      $timeout,
    } = this;

    $timeout(()=>{
      this.venues = StateService.venues;
      this.entityName = StateService.getEntityName();
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


  constructor($rootScope, BroadcastEvents, $timeout, StateService, UserService, $stateParams, $state, Spinner) {
    "ngInject";
    this.$timeout = $timeout;
    this.StateService = StateService;
    this.$state = $state;
    this.UserService = UserService;
    this.Spinner = Spinner;

    if (StateService.isLoaded()) {
      this.setVenue();
    } else {
      $rootScope.$on(BroadcastEvents.ON_STATE_LOADED,(event,venues)=>{
        this.setVenue();
      });
    }
  }
}
