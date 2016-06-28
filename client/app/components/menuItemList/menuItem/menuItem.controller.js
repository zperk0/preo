export default class menuItemController {
  static get UID(){
    return "menuItemController";
  }

  saveItem(){
    this.Spinner.show("item-save");
    return this.$q((resolve, reject)=>{
      this.item.update()
        .then(resolve,reject)
        .then(()=>{
          this.Spinner.hide("item-save");
      })
    });
  }


  //sets action callbacks for <card-item-actions>
  setCardActions(){
    const that = this;
    this.cardItemActions={
      onClone: ($event) => {
        that.menuItemListCtrl.cloneItem(this.item); //will create a new item with this item as data
      },
      onEdit: ($event) => {
        that.originalItem  = angular.copy(that.item);
        that.menuItemListCtrl.selectItem(that.item);
        that.ContextualMenu.show(that.type, that.item, that.handleSuccess.bind(that), that.handleCancel.bind(that));
      },
      onDelete: ($event)=>{
        const msg = that.section ? that.LabelService.CONTENT_DELETE_ITEM_SECTION : that.LabelService.CONTENT_DELETE_ITEM;
        that.DialogService.delete(that.LabelService.TITLE_DELETE_ITEM, msg)
          .then(()=>{
            that.menuItemListCtrl.deleteItem(that.item);
          })
        $event.stopPropagation();
      },
      onVisibility:(newStatus, $event)=>{
        that.item.visible = newStatus ? 1 : 0;
        that.saveItem();
        $event.stopPropagation();
      }
    }
  }

    handleSuccess(entity){
    if (this.item && entity){
      this.item = entity;

      if (this.item.id === -1){
        this.menuItemListCtrl.createItem(this.item)
          .then(()=>{
            this.ContextualMenu.hide();
            this.Snack.show('Item created');
          }, ()=>{
            this.Snack.showError('Error saving item');
          })

      } else {
        this.saveItem().then(()=>{
          this.ContextualMenu.hide();
          this.item.$selected = false;
        })
      }
    }
  }

  restoreOriginalValues(){
    if (this.originalItem){
      this.item.name = this.originalItem.name;
      this.item.description = this.originalItem.description;
      this.item.price = this.originalItem.price;
      this.item.$size = this.originalItem.$size;
      this.originalItem = false;
    }
  }

  handleCancel(event, entity, type){
    this.restoreOriginalValues()
    this.item.$selected = false;
    if (this.item.id === -1){
      this.menuItemListCtrl.clearPossibleNewItem();
    }
  }


  constructor($q, Snack, DialogService, BroadcastEvents, $rootScope, LabelService, Spinner, $timeout, ContextualMenu) {
    "ngInject";
    this.$q =$q;
    this.Snack = Snack;
    this.ContextualMenu = ContextualMenu;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.type="menuItem";
    this.setCardActions();

    //if it's a new item we toggle the context menu to edit this
    if (this.item && this.item.id === -1) {
      $timeout(()=>{
        this.ContextualMenu.show(this.type, this.item, this.handleSuccess.bind(this), this.handleCancel.bind(this));
      })
    }
  }
}
