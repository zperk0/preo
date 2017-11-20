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
    },1000)
  }

  setVenue(){

    const {
      StateService,
      $timeout,
    } = this;

    $timeout(()=>{
      this.allVenues = StateService.venues || [];
      this.allChannels = StateService.channels || [];
      this.venues = StateService.venues || [];
      this.channels = StateService.channels || [];
      this.entityName = StateService.getEntityName();
    });
  }

  shouldShowSearch(){

    const {
      allVenues,
      allChannels,
      UserService,
    } = this;

    const totalLength = allVenues.length + allChannels.length;

    return totalLength > 1 || UserService.isAdmin();
  }

  isAdmin() {
    return this.UserService.isAdmin();
  }

  doUserSearch() {

    const {
      allVenues,
      allChannels
    } = this;

    const value = this.searchLabel.toLowerCase();

    this.venues = allVenues.filter((v) => {
      return v.name.toLowerCase().indexOf(value) === 0;
    });

    this.channels = allChannels.filter((c) => {
      return c.name.toLowerCase().indexOf(value) === 0;
    });
  }

  doAdminSearch(){

    if (!this.searchLabel) {
      const {
        allVenues,
        allChannels
      } = this;

      this.venues = allVenues;
      this.channels = allChannels;
      return;
    }

    this.Spinner.show('venue-search');

    Preoday.Dashboard.search(this.searchLabel)
    .then((result)=>{
      if (result) {
        this.venues = result.venues;
        this.channels = result.channels;
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
    this.isChannel = StateService.isChannel;

    this.allVenues = [];
    this.allChannels = [];

    this.venues = [];
    this.channels = [];

    if (UserService.isAdmin()) {
      this.doSearch = this.doAdminSearch.bind(this);
    } else {
      this.doSearch = this.doUserSearch.bind(this);
    }

    if (StateService.isLoaded()) {
      this.setVenue();
    } else {
      $rootScope.$on(BroadcastEvents.ON_STATE_LOADED,(event,venues)=>{
        this.setVenue();
      });
    }
  }
}
