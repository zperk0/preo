export default class cardItemController {
  static get UID(){
    return "cardItemController";
  }

  toggleCardActions($event, newStatus){
    this.showCardActions= newStatus !== undefined ? newStatus : !this.showCardActions;
    $event.stopPropagation();
  }


  constructor() {
    "ngInject";
    this.showCardActions = false;
  }
}
