
export default class promotionsController {
  static get UID(){
    return "promotionsCtrl";
  }

  init(){

    if (this.StateService.venue.isEvent()){ //pre-load events
      this.EventService.getLastWeekEvents(this.StateService.venue.id)
    }
  }


  /* @ngInject */
  constructor($q, Spinner, Snack, StateService, EventService,  $timeout, promotions) {
    "ngInject";
    this.Spinner = Spinner;
    this.$q = $q;
    this.Snack = Snack;
    this.StateService = StateService;
    this.EventService = EventService;
    this.$timeout = $timeout;
    this.init();
    this.promotions = promotions;

  }
}
