
export default class venueOpeningHoursController {
  static get UID(){
    return "venueOpeningHoursController";
  }

  constructor(VenueService) {
    "ngInject";

    this.openingHours = [{
    	venueId: VenueService.currentVenue.id,
    	open: null,
    	close: null
    }];
  }
}
