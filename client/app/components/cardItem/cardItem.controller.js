export default class cardItemController {
  static get UID(){
    return "cardItemController";
  }

  toggleCardActions($event, newStatus){
    this.showCardActions= newStatus !== undefined ? newStatus : !this.showCardActions;
    $event.stopPropagation();
  }

  /* @ngInject */
  constructor() {
    this.showCardActions = false;
  }
}
