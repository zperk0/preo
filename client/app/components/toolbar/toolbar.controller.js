export default class toolbarController {
  static get UID(){
    return "toolbarController";
  }

  getVenues(){
    return this.VenueService.venues;
  }

  getUser(){
    return this.UserService.user;
  }

  getStateAsUrl (stateName) {

    return this.hasVenueSet() && this.$state.href(stateName, {
      venueId: this.VenueService.currentVenue.id
    });
  }

  hasVenueSet() {

    return this.VenueService.hasVenueSet();
  }


  constructor(VenueService, UserService, $state) {
    "ngInject";
    this.UserService=UserService;
    this.VenueService=VenueService;
    this.$state=$state;
  }
}
