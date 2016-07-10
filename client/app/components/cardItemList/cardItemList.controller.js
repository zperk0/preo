export default class cardItemListController {
  static get UID(){
    return "cardItemListController"
  }

    //sets action callbacks for <card-item-actions>
  setCardActions(){
    const that = this;
    this.cardItemActions={
      onClone: ($event) => {
        that.cloneItem();
      },
      onEdit: ($event) => {
        that.originalItem  = angular.copy(that.item);
        that.menuItemListCtrl.selectItem(that.item);
        that.contextual.showMenu(that.type, that.item, that.contextualMenuSuccess.bind(that), that.contextualMenuCancel.bind(that));
      },
      onDelete: ($event)=>{
        that.deleteItem();
        $event.stopPropagation();
      }
    }
  }

  cloneItem(){
    console.log("cloning item");
  }

  editItem(){
    console.log("edit item");
  }

  deleteItem(){
   console.log("delete item");
  }

  clickNew(){
    console.log("clicked new");
    if (this.onClickNew){
      this.onClickNew();
    }
  }

  constructor() {
    "ngInject";
    this.setCardActions();
  }
}
