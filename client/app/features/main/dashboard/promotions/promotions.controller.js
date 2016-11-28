
export default class promotionsController {
  static get UID(){
    return "promotionsCtrl";
  }

   fetchPromotions(){
    return this.$q.resolve([
      {
      "id": 16,
      "venueId": this.VenueService.currentVenue.id,
      "type": "FIXED",
      "name": "10% card discount",
      "description": "card everyone",
      "paymentType": "CARD",
      "items": null,
      "amount": 0.1,
      "startDate": "2016-03-30T14:30:06.000+0000",
      "endDate": "2018-05-13T23:00:00.000+0000",
      "minBasket": null,
      "maxUserClaims": null,
      "maxClaims": null,
      "apply": "ALWAYS",
      eventId:4258,
      "firstOrder": 0,
      "visible": 1,
      "active": 1,
      today:true,
      "created": null,
      "updated": null
      },
      {
      "id": 74,
      "venueId": this.VenueService.currentVenue.id,
      "type": "FIXED",
      "name": "15% cash discount",
      "description": "everyone",
      "paymentType": "CASH",
      "items": null,
      "amount": 0.15,
      "startDate": "2016-03-30T14:29:49.000+0000",
      "endDate": "2018-05-13T23:00:00.000+0000",
      "minBasket": null,
      "maxUserClaims": null,
      "maxClaims": null,
      "apply": "ALWAYS",
      "firstOrder": 0,
      "visible": 1,
      today:false,
      "active": 0,
      "created": null,
      "updated": null
      },
        {
        "id": 74,
        "venueId": this.VenueService.currentVenue.id,
        "type": "FIXED",
        "name": "15% cash discount",
        "description": "everyone",
        "paymentType": "CASH",
        "items": null,
        "amount": 0.15,
        "startDate": "2016-03-30T14:29:49.000+0000",
        "endDate": "2018-05-13T23:00:00.000+0000",
        "minBasket": null,
        "maxUserClaims": null,
        "maxClaims": null,
        "apply": "ALWAYS",
        "firstOrder": 0,
        "visible": 1,
        today:false,
        "active": 1,
        "created": null,
        "updated": null
        }
    ])
    // return Preoday.promotions.getByVenueId()
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
