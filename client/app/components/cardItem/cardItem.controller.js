export default class cardItemController {
  static get UID(){
    return "cardItemController";
  }

  toggleCardActions($event, newStatus){
    this.showCardActions= newStatus !== undefined ? newStatus : !this.showCardActions;
    $event.stopPropagation();
  }

  contextualMenuSuccess(){

  }

  contextualMenuCancel(){

  }


  constructor($timeout, contextual) {
    "ngInject";
    this.showCardActions = false;
    this.type="modifier";

    if (this.item && !this.item.id) {
      $timeout(()=>{
        contextual.showMenu(this.type, this.item, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
      })
    }
  }
}
