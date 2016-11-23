
export default class venueOpeningHoursController {
  static get UID(){
    return "venueOpeningHoursController";
  }

  hasOpeningHours () {
  	return true;
  }

  hasServiceMethods () {
  	return true;
  }

  hasCollectionService () {
  	return true;
  }

  hasDeliveryService () {
  	return true;
  }

  constructor(VenueService) {
    "ngInject";

    this.openingHours = [{
    	venueId: VenueService.currentVenue.id,
    	open: null,
    	close: null
    }];

    this.isSavingOpeningHours = true;
    this.isSavingServiceHours = true;
  }
}
