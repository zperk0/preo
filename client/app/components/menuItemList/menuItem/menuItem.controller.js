export default class menuItemController {
  static get UID(){
    return "menuItemController";
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
      },
      onVisibility:(newStatus, $event)=>{
        that.toggleVisibility(newStatus)
        $event.stopPropagation();
      }
    }
  }

  toggleVisibility(newStatus){
    this.ItemService.checkMultipleOccurrences(this.item)
    .then((updateAction)=>{
      this.item.visible = newStatus ? 1 : 0;
       return this.ItemService.updateItem(this.item, updateAction, true)
    })
    .catch(()=>{
          this.item.visible = !this.item.visible;
          this.Snack.showError('Item visibility not changed');
    })
  }

  cloneItem(){
    this.Spinner.show("item-clone")
    this.ItemService.cloneItem(this.item)
      .then((createdItem)=>{
        this.Spinner.hide("item-clone")
        this.Snack.show('Item duplicated');
        this.onItemCreated({item:createdItem});
      }, (err)=>{
        console.log("failed creating item", err)
        this.Spinner.hide("item-clone")
        this.Snack.showError('Failed duplicating item');
    })
  }


  createItem(){
    this.Spinner.show("item-create")
    this.ItemService.createItem(this.item)
      .then((createdItem)=>{
        this.item = createdItem;
        this.Spinner.hide("item-create")
        this.Snack.show('Item created');
        this.contextualMenu.hide();
        this.onItemCreated({item:this.item});
      }, (err)=>{
        console.log("failed creating item", err)
        this.Spinner.hide("item-create")
        this.Snack.showError('Failed creating item');
      })
  }

  updateItem(updates){
    this.ItemService.checkMultipleOccurrences(updates)
    .then((updateAction)=>{
      this.Spinner.show("item-updated")
      return this.ItemService.updateItem(updates, updateAction)
    })
    .then((updatedItem)=>{
        this.item = updatedItem;
        this.Spinner.hide("item-updated")
        this.Snack.show('Item updated');
        this.contextualMenu.hide();
    }, (err)=>{
      console.log("Failed updating item", err)
      this.Spinner.hide("item-updated")
      this.Snack.showError('Item not updated');
    })
  }

  contextualMenuSuccess(updates){
    if (!this.item.id){
      this.createItem();
    }
    else {
      this.updateItem(updates);
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

  contextualMenuCancel(event, entity, type){
    this.restoreOriginalValues()
    this.item.$selected = false;
    if (!this.item.id){
      this.menuItemListCtrl.clearPossibleNewItem();
    }
  }

  deleteItem(){
    const msg = this.item.sectionId ? this.LabelService.CONTENT_DELETE_ITEM_SECTION : this.LabelService.CONTENT_DELETE_ITEM;
    this.DialogService.delete(this.LabelService.TITLE_DELETE_ITEM, msg)
      .then(()=>{
          this.Spinner.show("item-delete");
          this.ItemService.deleteItem(this.item)
            .then(()=>{
              this.Snack.show('Item deleted');
              this.onItemDeleted({item:this.item});
              this.Spinner.hide("item-delete");
            })
            .catch((err)=>{
              console.log("Failed deleting item", err)
              this.Spinner.hide("item-delete")
              this.Snack.showError('Item not deleted');
            })
      })
  }


  constructor($q, Snack, DialogService, $stateParams, BroadcastEvents, $rootScope, LabelService, Spinner, $timeout, contextual, contextualMenu, ItemService) {
    "ngInject";
    this.$q =$q;
    this.Snack = Snack;
    this.contextualMenu = contextualMenu;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.type="menuItem";
    this.$stateParams=$stateParams;
    this.setCardActions();
    this.contextual = contextual;
    this.ItemService = ItemService;
    let inParam = false;
    if (this.item.id === Number($stateParams.itemId)){
      inParam = true;
      this.item.$selected = true;
    }
    //if it's a new item we toggle the context menu to edit this
    if (this.item && !this.item.id || inParam) {
      $timeout(()=>{
        this.contextual.showMenu(this.type, this.item, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
      })
    }
  }
}
