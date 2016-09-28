'use strict';

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

      function _resolvePromise(data) {

        this.$rootScope.$broadcast(this.BroadcastEvents._ON_FETCH_VENUES, data);
        resolve(data);        
      }

      Preoday.Venue.fetch({
        adminId: user.id,
        roles: "admin,owner",
        expand: 'features'
      }).then((venues)=>{

        if (venues && venues.length){
          this.venues = venues;

          let venueId = this.getVenueIdParameter();

          if (venueId && Number(venueId) > 0){

            return this.fetchById(Number(venueId)).then((venue)=>{
              this.setCurrentVenue(venue)
                .then(() => {

                  _resolvePromise.bind(this)(venues);
                }, () => {

                  _resolvePromise.bind(this)(venues);
                });
            },reject);
          }

          this.setCurrentVenue(venues[0])
            .then(() => {

              _resolvePromise.bind(this)(venues);
            }, () => {

              _resolvePromise.bind(this)(venues);
            });

        } else {
          _resolvePromise.bind(this)(venues);
        }
      }, reject);
    });
  }

  setCurrentVenue (venue) {

    let deferred = this.$q.defer();

    this.currentVenue = venue;
    venue.setAsCurrent();

    this.checkFeatures(venue)
      .then(() => {

        this.$rootScope.$broadcast(this.BroadcastEvents.ON_CURRENT_VENUE, venue);
        deferred.resolve();
      }, () => {

        this.$rootScope.$broadcast(this.BroadcastEvents.ON_CURRENT_VENUE, venue);
        deferred.resolve();
      });

    return deferred.promise;
  }

  checkFeatures () {

    let FeatureService = this.$injector.get('FeatureService');

    FeatureService.clearLocalFeatures();

    return this.$q.all([
        FeatureService.hasFeatureForInit(Preoday.constants.Feature.OUTLET),
        FeatureService.hasFeatureForInit(Preoday.constants.Feature.NESTED_MODIFIER),
        FeatureService.hasFeatureForInit(Preoday.constants.Feature.CUSTOM_PICKUP_SLOTS),
      ]);
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

    let venueId = this.getVenueIdParameter();

    if (venueId && Number(venueId) > 0){
      this.$rootScope.$broadcast(this.BroadcastEvents._PREO_DO_VENUE_SELECT,this.$stateParams.venueId)
    } else {
      venueId = this.venues[0].id;
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

  getVenueIdParameter() {

    return this.venueId || this.$stateParams.venueId;
  }

  restore () {

    this.venuesDeferred = null;
    this.venues = null;
    this.hasSelectedVenues = false;    
  }

  constructor($q, $state, $stateParams, $rootScope, $timeout, $injector, BroadcastEvents, gettextCatalog, UserService, ErrorService) {
    "ngInject";
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.$injector = $injector;
    this.BroadcastEvents = BroadcastEvents;
    this.gettextCatalog = gettextCatalog;
    this.UserService = UserService;
    this.ErrorService = ErrorService;

    this.venuesDeferred = null;
    this.venues = null;

    this.hasSelectedVenues = false;
  }
}
