export default class VenueService {

  static get UID(){
    return "VenueService";
  }

  fetchById(venueId){
    return this.$q((resolve,reject)=>{
      //If i have a list, try to find it in the cached list
      if (this.venues){
        let filtered = this.venues.filter((v)=>{
          return v.id===Number(venueId);
        });
        if (filtered.length){
          return resolve(filtered[0]);
        }
        //Else try to get the venue if i'm super admin, or redirect to 404
        //this.$state.go("notFound");
      } else {
        reject();
      }
    });
  }

  fetchUserVenues (user) {
    return this.$q((resolve,reject)=>{
      Preoday.Venue.fetch({adminId:user.id,roles:"admin,owner"})
      .then((venues)=>{
        if (venues && venues.length){
          this.venues = venues;
          if (this.$stateParams.venueId && Number(this.$stateParams.venueId) > 0){
            return this.fetchById(Number(this.$stateParams.venueId)).then((venue)=>{
              this.setCurrentVenue(venue);
              this.$rootScope.$broadcast(this.BroadcastEvents._ON_FETCH_VENUES, venues);
              resolve(venues);
            },reject);
          }
          this.setCurrentVenue(venues[0]);
          this.$rootScope.$broadcast(this.BroadcastEvents._ON_FETCH_VENUES, venues);

        }
        resolve(venues);
      }, reject);
    });
  }

  setCurrentVenue (venue) {

    this.currentVenue = venue;
    venue.setAsCurrent();

    this.$rootScope.$broadcast(this.BroadcastEvents.ON_CURRENT_VENUE, venue);
  }

  hasVenueSet () {

    return this.currentVenue && this.currentVenue.id > 0;
  }

  signout() {
    Preoday.User.signout();
    window.location.reload();
  }

  goToVenue () {

    if (this.venues.length === 0 ){
      //TODO GET VENUES THAT I'M STAFF, if there's at least one show staff errro
      // if (venuesStaff.length){
        //ErrorService.showError("STAFF");
      // }
      this.venuesDeferred.resolve();
      this.unsetVenuesDeferred();
      return this.$state.go("notFound");
    }

    if (this.$stateParams.venueId && Number(this.$stateParams.venueId) > 0){
      this.$rootScope.$broadcast(this.BroadcastEvents._PREO_DO_VENUE_SELECT,this.$stateParams.venueId)
    } else {
      let venueId = this.venues[0].id;
      this.$state.go("main.dashboard", {venueId});
    }

    this.venuesDeferred.resolve();
    this.unsetVenuesDeferred();
  }

  selectVenue () {

    if (this.venues) {

      this.venuesDeferred = this.$q.defer();
      this.$timeout(() => {

        this.goToVenue();
      });
      return this.venuesDeferred.promise;
    }

    if (this.venuesDeferred) {
      return this.venuesDeferred.promise;
    }

    this.venuesDeferred = this.$q.defer();

    let user = this.UserService.getCurrent();

    this.hasSelectedVenues = true;

    this.fetchUserVenues(user)
      .then((venues)=>{

        this.venues = venues;

        this.goToVenue();
      }, (err)=>{
        
        this.ErrorService.showError('FAILED_LOADING_VENUES');

        this.venuesDeferred.reject();
        this.unsetVenuesDeferred();
      });    

      return this.venuesDeferred.promise;
  }

  unsetVenuesDeferred () {

    this.venuesDeferred = null;
  }

  constructor($q, $state, $stateParams, $rootScope, $timeout, BroadcastEvents, gettextCatalog, UserService, ErrorService) {
    "ngInject";
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.BroadcastEvents = BroadcastEvents;
    this.gettextCatalog = gettextCatalog;
    this.UserService = UserService;
    this.ErrorService = ErrorService;

    this.venuesDeferred = null;
    this.venues = null;

    this.hasSelectedVenues = false;
  }
}
