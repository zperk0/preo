export default class toolbarController {
  static get UID(){
    return "toolbarController";
  }

  getVenues(){
    return this.VenueService.venues;
  }

  getVenues(){
    return this.UserService.user;
  }

  /* @ngInject */
  constructor(VenueService, UserService) {
    'ngInject';
    this.UserService=UserService;
    this.VenueService=VenueService;
  }
}
