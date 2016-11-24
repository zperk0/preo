export default class promotionsListController {
  static get UID(){
    return "promotionsListController"
  }


   showCreate(){
      let isCreating = this.promotions.filter(function (item) {
        return item.id === undefined;
      }).length;

    if (isCreating){
      console.log("Not showing new promotion, already showing")
      return;
    }

    let promotion = new Preoday.Invite({
      "venueId": this.VenueService.currentVenue.id,
      "type": "PERCENT",
      "name": "",
      $displayName:"",
      "paymentType": "",
      "items": null,
      "amount": null,
      "startDate":null,
      "endDate": null,
      "minBasket": 0,
      "maxUserClaims": null,
      "apply": "ALWAYS",
      "firstOrder": 0,
      "visible": 1,
      "active": 1
    });

    this.promotions.push(promotion);
  }

  /* @ngInject */
  constructor() {
  }
}
