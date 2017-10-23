'use strict';

export default class HoursService {

  static get UID(){
    return "HoursService";
  }

  save (data) {

    return Preoday.Hour.save(this.StateService.venue.id, data);
  }


  constructor(StateService) {
    "ngInject";

    this.StateService = StateService;

  }
}
