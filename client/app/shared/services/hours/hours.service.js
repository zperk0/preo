'use strict';

export default class HoursService {

  static get UID(){
    return "HoursService";
  }

  save (data) {

    return Preoday.Hour.save(this.VenueService.currentVenue.id, data);
  }


  constructor(VenueService) {
    "ngInject";

    this.VenueService = VenueService;

  }
}
