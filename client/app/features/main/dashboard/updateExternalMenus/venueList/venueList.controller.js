export default class venueListController {
  static get UID(){
    return "venueListController"
  }

  /* @ngInject */
  constructor(VenueService) {
    "ngInject";
    this.VenueService = VenueService
  }
}
