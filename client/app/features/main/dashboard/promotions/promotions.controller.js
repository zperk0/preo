
export default class promotionsController {
  static get UID(){
    return "promotionsCtrl";
  }

  init(){

    if (this.VenueService.currentVenue.isEvent()){ //pre-load events
      this.EventService.getLastWeekEvents(this.VenueService.currentVenue.id)
    }
  }


  /* @ngInject */
  constructor($q, Spinner, Snack, VenueService, EventService,  $timeout, promotions) {
    "ngInject";
    this.Spinner = Spinner;
    this.$q = $q;
    this.Snack = Snack;
    this.VenueService = VenueService;
    this.EventService = EventService;
    this.$timeout = $timeout;
    this.init();
    this.promotions = promotions;

  }
}
