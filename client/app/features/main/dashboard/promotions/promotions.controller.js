
export default class promotionsController {
  static get UID(){
    return "promotionsCtrl";
  }

  init(){

    if (this.StateService.venue.isEvent()){ //pre-load events
      this.EventService.getLastWeekEvents(this.StateService.venue.id)
    }
    this.Spinner.show("fetch-promo");
    // this.fetchPromotions()
    Preoday.Offer.getByVenueId(this.StateService.venue.id)
      .then((promotions)=>{
        this.promotions = promotions;
        console.log("got promotions", this.promotions);
        this.Spinner.hide("fetch-promo");
      }, (err)=>{
        this.Spinner.hide("fetch-promo");
        console.log("error", err)
      }) .catch((err)=>{
        this.Spinner.hide("fetch-promo");
        console.log("error", err)
      })
  }

  /* @ngInject */
  constructor($q, Spinner, Snack, StateService, EventService,  $timeout) {
    "ngInject";
    this.Spinner = Spinner;
    this.$q = $q;
    this.Snack = Snack;
    this.StateService = StateService;
    this.EventService = EventService;
    this.$timeout = $timeout;
    this.promotions=[];
    this.init();

  }
}
