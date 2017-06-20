
export default class updateExternalMenusController {
  static get UID(){
    return "updateExternalMenusController";
  }


  constructor(VenueService) {
    "ngInject";

		this.venues = [VenueService.currentVenue];

		console.log('venues ', this.venues);
  }
}
