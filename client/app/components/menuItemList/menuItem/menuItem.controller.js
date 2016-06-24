export default class menuItemController {
  static get UID(){
    return "menuItemController";
  }

  saveItem(){
    this.Spinner.show("item-save");
    return this.$q((resolve, reject)=>{
      this.item.update()
        .then(()=>{
          this.Snack.show('Item updated');
          resolve();
      },()=>{
        reject();
        this.Snack.showError('Error saving item');
      }).then(()=>{
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
        that.menuCtrl.showContextualMenu(that.item,that.type, that.saveItem.bind(that));
      },
      onDelete: ($event)=>{
        const msg = this.section ? that.LabelService.CONTENT_DELETE_ITEM_SECTION : that.LabelService.CONTENT_DELETE_ITEM;
        that.DialogService.delete(that.LabelService.TITLE_DELETE_ITEM, msg)
          .then(()=>{
            that.menuItemListCtrl.deleteItem(this.item);
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

  handleCloseContextualMenuSuccess (event, entity, type) {
    if (this.item){
      if(entity && type=== this.type && entity.id === this.item.id){
        this.item = entity;
      }
    this.item.$selected = false;
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

  handleCloseContextualMenuCancel(event, entity, type){
    this.restoreOriginalValues()
    this.item.$selected = false;
  }


  constructor($q, Snack, DialogService, BroadcastEvents, $rootScope, LabelService, Spinner, $timeout) {
    "ngInject";
    this.$q =$q;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.type="menuItem";
    this.setCardActions();

    //if it's a new item we toggle the context menu to edit this
    if (this.item && this.item.id === -1) {
      $timeout(()=>{
        this.menuCtrl.showContextualMenu(this.item,this.type, this.createItem.bind(this));
      })
    }

    this.onSuccessCleanup = $rootScope.$on(BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU_SUCCESS, this.handleCloseContextualMenuSuccess.bind(this));
    this.onCancelCleanup = $rootScope.$on(BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU_CANCEL, this.handleCloseContextualMenuCancel.bind(this));
  }
}
