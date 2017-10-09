export default class menuItemMoreController {
  static get UID(){
    return "menuItemMoreController"
  }

  /* @ngInject */
  constructor(VenueService) {
    'ngInject';

    this.isEvent = VenueService.currentVenue.isEvent();
  }
}
