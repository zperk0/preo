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

    let promotion = new Preoday.Offer({
      "venueId": this.StateService.venue.id,
      "type": "FIXED",
      "name": "",
      "displayName":"",
      "paymentType": null,
      "items": null,
      "amount": null,
      "startDate":null,
      "endDate": null,
      "minBasket": 0,
      "maxUserClaims": null,
      "apply": "ALWAYS",
      "now":true,
      "firstOrder": 0,
      "visible": 0,
      "active": 1,
      $selected:true
    });

    this.promotions.push(promotion);
  }

  /* @ngInject */
  constructor(StateService) {
    "ngInject";
    this.StateService = StateService
  }
}
