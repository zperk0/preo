'use strict';

export default class VenueService {

  static get UID(){
    return "VenueService";
  }

  fetchById(venueId){
    return this.$q((resolve,reject)=>{
      //If i have a list, try to find it in the cached list
      console.log("loading", this.venues, venueId)
        // let filtered = this.venues.filter((v)=>{
        //   return v.id===Number(venueId);
        // });
        // if (filtered.length){
        //   return resolve(filtered[0]);
        // }
        // if (this.UserService.isAdmin()){
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
        // } else {
          // reject();
        // }
    });
  }

  /*
  * @channel -> Channel object from JSCORE
  * @expand  -> the venue expand. Eg: outlets,events
  * @permissions -> the venue and groups permission array. Eg: ['analytics_read']
  */
  fetchVenuesByChannel(channel, expand, permissions) {

    const {
      cachePrefix,
      UtilsService,
      $q,
    } = this;

    const deferred = $q.defer();

    channel.getEntities(expand, permissions && permissions.join(','))
      .then((data) => {

        deferred.resolve(data);
      }, (err) => {

        deferred.reject(err);
      });

    return deferred.promise;
  }

  signout() {
    Preoday.User.signout();
    window.location.reload();
  }

  updateVenue(venue){
    var venueCopy = angular.copy(venue);

    delete venueCopy.ccySymbol;
    return venueCopy.update()
  }

  saveImage (venue, venueImage) {

    venueImage.venueId = venue.id;

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

  getKmOrMiles(venue){
    var milesLocale =['en-US', 'en-GB']
    if (venue && milesLocale.indexOf(venue.locale) !== -1)
      return "miles"
    return "kms"
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

    this.cachePrefix = 'venues';

    this.venuesDeferred = null;
    this.venues = null;

    this.hasSelectedVenues = false;
  }
}
