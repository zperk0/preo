export default class cardItemController {
  static get UID(){
    return "cardItemController";
  }

  toggleCardActions($event){
    this.showCardActions=!this.showCardActions;
    $event.stopPropagation();
  }

  /* @ngInject */
  constructor() {
    this.showCardActions = false;
  }
}
