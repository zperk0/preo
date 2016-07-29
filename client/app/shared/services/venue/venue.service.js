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
          if (this.$stateParams.venueId){
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

  constructor($q, $state, $stateParams, $rootScope, BroadcastEvents, gettextCatalog) {
    "ngInject";
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.BroadcastEvents = BroadcastEvents;
    this.gettextCatalog = gettextCatalog;
  }
}
