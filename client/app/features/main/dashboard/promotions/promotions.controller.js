
export default class promotionsController {
  static get UID(){
    return "promotionsCtrl";
  }



  init(){
    this.Spinner.show("fetch-promo");
    // Preoday.promotions.getByVenueId()
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
  constructor($q, Spinner, Snack, VenueService,  $timeout) {
    "ngInject";
    this.Spinner = Spinner;
    this.$q = $q;
    this.Snack = Snack;
    this.VenueService = VenueService;
    this.$timeout = $timeout;
    this.promotions=[];
    this.init();

  }
}
