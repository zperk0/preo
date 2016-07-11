export default class menuItemController {
  static get UID(){
    return "menuItemController";
  }

  onNewModifierMoved($modifier, $partFrom, $partTo, $indexFrom, $indexTo){
    this.Snack.show("moving modifier to item");
  }


  onClone ($event){
      this.cloneItem();
  }
  onEdit ($event){
    this.originalItem  = angular.copy(this.item);
    this.menuItemListCtrl.selectItem(this.item);
    this.contextual.showMenu(this.type, this.item, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
  }
  onDelete ($event){
    this.deleteItem();
  }
  onVisibility (newStatus){
    this.toggleVisibility(newStatus)
  }

  toggleVisibility(newStatus){
    let updates = angular.copy(this.item);
    updates.visible = newStatus ? 1 : 0;
    this.updateItem(updates, true) //skip extensions
      .then(()=>{
        this.menuItemListCtrl.selectItem();
      })
      .catch(()=>{
          this.Snack.showError('Item visibility not changed');
      })
  }

  cloneItem(){
    this.Spinner.show("item-clone")
    this.ItemService.cloneItem(this.item, this.sectionId)
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
    this.ItemService.createItem(this.item, this.sectionId)
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

  updateItem(updates, skipExtensions = false){
    return this.checkMultipleOccurrences(updates)
    .then((updateAction)=>{
      this.Spinner.show("item-updated")
      if (updateAction === 'all'){
        return this.ItemService.updateItem(updates, skipExtensions)
          .then((updatedItem)=>{
            this.item = updatedItem;
          })
      }
      return this.ItemService.doSingleEdit(updates, this.sectionId)
    })
    .then(()=>{
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
    //clear selection
    this.menuItemListCtrl.selectItem();
  }

  deleteItem(){
    const msg = this.sectionId ? this.LabelService.CONTENT_DELETE_ITEM_SECTION : this.LabelService.CONTENT_DELETE_ITEM;
    this.DialogService.delete(this.LabelService.TITLE_DELETE_ITEM, msg)
      .then(()=>{
          this.Spinner.show("item-delete");
          if (this.sectionId){
            return this.ItemService.removeFromSection(this.item, this.sectionId)
          }
          else {
            return this.ItemService.deleteItem(this.item)
          }
      })
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
  }

  //check if we have multiple occurrences before updating but only if we're in a section
  checkMultipleOccurrences(updates){
    if (this.sectionId){
      return this.ItemService.checkMultipleOccurrences(updates || this.item)
    }
    return this.$q.resolve(updates || this.item)
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
    this.contextual = contextual;
    this.ItemService = ItemService;
    this.newModifiers = [];

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
