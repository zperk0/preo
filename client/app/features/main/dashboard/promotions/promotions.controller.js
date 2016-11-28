
export default class promotionsController {
  static get UID(){
    return "promotionsCtrl";
  }

  init(){

    if (this.VenueService.currentVenue.isEvent()){ //pre-load events
      this.EventService.getLastWeekEvents(this.VenueService.currentVenue.id)
    }
    this.Spinner.show("fetch-promo");
    // this.fetchPromotions()
    Preoday.Offer.getByVenueId(this.VenueService.currentVenue.id)
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
  constructor($q, Spinner, Snack, VenueService, EventService,  $timeout) {
    "ngInject";
    this.Spinner = Spinner;
    this.$q = $q;
    this.Snack = Snack;
    this.VenueService = VenueService;
    this.EventService = EventService;
    this.$timeout = $timeout;
    this.promotions=[];
    this.init();

  }
}
