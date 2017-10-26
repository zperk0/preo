'use strict';

export default class VenueService {

  static get UID(){
    return "VenueService";
  }

  fetchById(venueId){
    return this.$q((resolve,reject)=>{
      //If i have a list, try to find it in the cached list
      console.log("loading", this.venues, venueId)
        let filtered = this.venues.filter((v)=>{
          return v.id===Number(venueId);
        });
        if (filtered.length){
          return resolve(filtered[0]);
        }
        if (this.UserService.isAdmin()){
          Preoday.Venue.getById(venueId,'features,outlets,map')
            .then((newVenue)=>{
              if (newVenue){
                resolve(newVenue)
              }
              else {
                reject();
              }
            },()=>{
              reject();
            })
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
        expand: 'features,outlets,map'
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

  loadAccount (venue) {
    return this.$q((resolve, reject) => {
      return venue.getPermissions(this.Permissions.ACCOUNT_READ)
      .then(perms => {
        if (perms[this.Permissions.ACCOUNT_READ]) {
          return resolve(Preoday.Account.get(venue.accountId));
        } else {
          return reject();
        }
      }, () => {
        return reject();
      });
    });
  }

  setCurrentVenue (venue) {
    let deferred = this.$q.defer();

    this.currentVenue = venue;
    venue.setAsCurrent();

    this.UtilsService.updateLocale();

    if (!venue.accountId) {
      this.$rootScope.$broadcast(this.BroadcastEvents.ON_CURRENT_VENUE, venue);
      this.account = {};
      return this.$q.when(venue);
    }

    this.loadAccount(venue)
    .then((account)=>{
      console.log("loaded account", account);
      this.account = account;
    }, ()=>{
      this.account = {};
    })
    .then(() => {

        this.$rootScope.$broadcast(this.BroadcastEvents.ON_CURRENT_VENUE, venue);
        deferred.resolve();
      }, () => {

        this.$rootScope.$broadcast(this.BroadcastEvents.ON_CURRENT_VENUE, venue);
        deferred.resolve();
      });

    return deferred.promise;
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
      this.venuesDeferred.resolve();
      this.unsetVenuesDeferred();
      return;
    }

    let venueId = this.getVenueIdParameter();

    if (venueId && Number(venueId) > 0){
      this.$rootScope.$broadcast(this.BroadcastEvents._PREO_DO_VENUE_SELECT,this.$stateParams.venueId)
    } else {
      venueId = this.venues[0].id;
      this.$state.go('main.dashboard', {venueId});
    }

    this.venuesDeferred.resolve(this.venues);
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

  load(){
    if (this.currentVenue && this.currentVenue.id>0){
      return this.$q.resolve(this.currentVenue);
    }
    return this.$q((resolve,reject)=>{
      this.selectVenue()
        .then(resolve,reject)
    })

  }

  updateVenue(){
    var venueCopy = angular.copy(this.currentVenue);

    delete venueCopy.ccySymbol;
    return venueCopy.update()
  }

  saveImage (venueImage) {

    venueImage.venueId = this.currentVenue.id;

    if (!venueImage.image && venueImage.$image) {
      venueImage.image = venueImage.$image;
    }

    return this.$q((resolve,reject)=>{
      Preoday.VenueImage.saveToCdn(venueImage)
        .then((response) => {

          response.id = venueImage.id;
          response.src = response.image;
          delete response.image;

          if (response.id) {
            response.update()
              .then(resolve, reject);
          } else {
            Preoday.VenueImage.create(response)
              .then(resolve, reject);
          }
        }, (err) => {

          delete response.image;
          reject(err);
        });

    });
  }

  getVenuePriceConfig () {

    var config = {
      thousand: ',',
      decimal: '.',
      format: '%s%v',
      symbol: ''
    };

    if (this.hasVenueSet()) {

      var countryCode = this.currentVenue.country || 'GB';
      config.symbol = this.currentVenue.ccySymbol || this.currentVenue.ccy || '';

      if (["FR", "DE", "NO", "SE"].indexOf(countryCode) >= 0) {
          config.thousand = " ";
          config.decimal = ",";
          config.format = "%v%s";
          if(countryCode == 'NO') {
            config.format = "%s %v";
          } else if(countryCode == 'SE') {
            config.format = "%v %s";
          }
      }
    }

    return config;
  }

  getKmOrMiles(){
    var milesLocale =['en-US', 'en-GB']
    if (this.currentVenue && milesLocale.indexOf(this.currentVenue.locale) !== -1)
      return "miles"
    return "kms"
  }

  getPermissions(){
    return this.PermissionService.loadPermissions(this.currentVenue);
  }

  searchCustomers(stringSearch) {
    const deferred = this.$q.defer();

    if (!this.currentVenue) {
      console.log("Need to set current venue");
      deferred.reject();
    } else {

      this.currentVenue.searchCustomers(stringSearch).then((data) => {
        deferred.resolve(data);
      }, (error) => {
        deferred.reject(error);
      });
    }

    return deferred.promise;
  }

  constructor($q, $state, $stateParams, $rootScope, $timeout, $injector, BroadcastEvents, PermissionService, gettextCatalog, UserService, ErrorService, UtilsService, Permissions) {
    "ngInject";
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.$injector = $injector;
    this.BroadcastEvents = BroadcastEvents;
    this.PermissionService = PermissionService;
    this.gettextCatalog = gettextCatalog;
    this.UserService = UserService;
    this.ErrorService = ErrorService;
    this.UtilsService = UtilsService;
    this.Permissions = Permissions;

    this.venuesDeferred = null;
    this.venues = null;

    this.hasSelectedVenues = false;
  }
}
