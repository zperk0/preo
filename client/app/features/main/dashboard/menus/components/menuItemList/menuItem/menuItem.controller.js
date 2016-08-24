export default class menuItemController {
  static get UID(){
    return "menuItemController";
  }

  onNewModifierMoved($modifiers, $partFrom, $partTo, $indexFrom, $indexTo){

    function _doAddModifier(newItem = this.item.item){
      this.Spinner.show("moving-item-modifiers");
      let promises = this.ModifierService.addModifiersToParent($modifiers, newItem);

      return this.$q.all(promises).then(()=>{
        this.Snack.show("Added modifiers to item");
      })
      .then(()=>{
        this.Spinner.hide("moving-item-modifiers");
        return newItem;
      })
    }

    //item has modifier?
    if (this.ModifierService.isModifiersDuplicated($modifiers, this.item.item)){
      return this.Snack.showError("One or more modifiers already in item");
    }

    return this.checkMultipleOccurrences(this.item.item)
    .then((updateAction)=>{
      if (updateAction === 'all'){
        return _doAddModifier.call(this);
      } else {
        let clonePosition = this.menuItemListCtrl.getPosition(this.item.item);
        return this.ItemService.doSingleEdit(this.item.item, this.sectionId, clonePosition)
          .then(_doAddModifier.bind(this))
          .then((newItem)=>{
            this.cardItemList.onItemDeleted(this.item.item)
            if (this.onItemDeleted){
              this.onItemDeleted({item:this.item.item});
            }
            this.cardItemList.onItemCreated(newItem);
            if (this.onItemCreated){
              this.onItemCreated({item:newItem});
            }
          })
      }

    })
    .catch((err)=>{
       console.log("error", err);
        this.Snack.showError("Error adding modifiers to item");
    })


  }

  onClone ($event){
      this.cloneItem();
  }
  onEdit ($event){
    this.originalItem  = angular.copy(this.item.item);
    this.cardItemList.selectItem(this.item.item);
    this.contextual.showMenu(this.type, this.item.item, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
  }
  onDelete ($event){
    this.deleteItem();
  }
  onVisibility (newStatus){
    this.toggleVisibility(newStatus)
  }

  toggleVisibility(newStatus){
    let updates = angular.copy(this.item.item);
    updates.visible = newStatus ? 1 : 0;
    this.updateItem(updates, true) //skip extensions
      .then(()=>{
        this.cardItemList.selectItem();
      })
      .catch(()=>{
          this.Snack.showError('Item visibility not changed');
      })
  }

  cloneItem(){
    this.Spinner.show("item-clone")
    let clonePosition = this.menuItemListCtrl.getPosition(this.item.item);
    this.ItemService.cloneItem(this.item.item, this.sectionId, clonePosition)
      .then((createdItem)=>{
        createdItem.$show = true; //need show for animation
        this.Spinner.hide("item-clone")
        this.Snack.show('Item duplicated');
        console.log("cloned", createdItem, this.item.item);
        this.cardItemList.onItemCreated(createdItem);
        if (this.onItemCreated){
          this.onItemCreated({item:createdItem});
        }
      }, (err)=>{
        console.log("failed creating item", err)
        this.Spinner.hide("item-clone")
        this.Snack.showError('Failed duplicating item');
    })
  }


  createItem(){
    this.Spinner.show("item-create")
    this.ItemService.createItem(this.item.item, this.sectionId)
      .then((createdItem)=>{
        createdItem.$show = true;  //need show for animation
        this.menuItemListCtrl.deleteItem(this.item.item);
        this.contextualMenu.hide();
        debugger;
        this.cardItemList.onItemCreated(createdItem);
        if (this.onItemCreated){
          this.onItemCreated({item:createdItem});
        }
        this.Spinner.hide("item-create")
        this.Snack.show('Item created');
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
            this.restoreValues(updatedItem);
          })
      }
      let clonePosition = this.menuItemListCtrl.getPosition(this.item.item);
      return this.ItemService.doSingleEdit(updates, this.sectionId, clonePosition)
        .then((newItem)=>{
          this.cardItemList.onItemDeleted(this.item.item)
          if (this.onItemDeleted){
            this.onItemDeleted(this.item.item);
          }
          this.cardItemList.onItemCreated(newItem);
          if (this.onItemCreated){
            this.onItemCreated({item:newItem});
          }
        })
    })
    .then(()=>{
        this.Spinner.hide("item-updated")
        this.Snack.show('Item updated');
        this.contextualMenu.hide();
        this.cardItemList.onItemUpdated(this.item.item);
        if (this.onItemUpdated){
          this.onItemUpdated(this.item.item);
        }
    }, (err)=>{
      console.log("Failed updating item", err)
      this.Spinner.hide("item-updated")
      this.Snack.showError('Item not updated');
    })
  }

  contextualMenuSuccess(updates){
    if (!this.item.item.id){
      this.createItem();
    }
    else {
      this.updateItem(updates);
    }
  }

  restoreValues(newValues = false){
    if(newValues){
      this.originalItem = newValues;
    }
    if (this.originalItem){
      for (var property in this.originalItem) {
      if (this.originalItem.hasOwnProperty(property)) {
        this.item.item[property] = this.originalItem[property];
        }
      }
      this.originalItem = false;
    }
  }

  contextualMenuCancel(event, entity, type){
    this.restoreValues()
    this.item.$selected = false;
    if (this.item && !this.item.id) {
      this.item.$deleted = true;
      this.menuItemListCtrl.deleteItem(this.item.item);
    }
  }

  deleteItem(){
    const msg = this.sectionId ? this.LabelService.CONTENT_DELETE_ITEM_SECTION : this.LabelService.CONTENT_DELETE_ITEM;
    this.DialogService.delete(this.LabelService.TITLE_DELETE_ITEM, msg)
      .then(()=>{
          this.Spinner.show("item-delete");
          if (this.sectionId){
            return this.ItemService.removeFromSection(this.item.item, this.sectionId)
          }
          else {
            return this.ItemService.deleteItem(this.item.item)
          }
      })
      .then(()=>{
          this.cardItemList.onItemDeleted(this.item.item);
          if (this.onItemDeleted){
            this.onItemDeleted({item:this.item.item});
          }
          this.Snack.show('Item deleted');
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
      return this.ItemService.checkMultipleOccurrences(updates || this.item.item)
    }
    return this.$q.resolve('all');
  }


  constructor($scope, $q, Snack, DialogService, $stateParams, BroadcastEvents, $rootScope, LabelService, Spinner, $timeout, contextual, contextualMenu, ItemService, ModifierService) {
    "ngInject";
    this.$q =$q;
    this.$scope =$scope;
    this.Snack = Snack;
    this.contextualMenu = contextualMenu;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.ModifierService = ModifierService;
    this.LabelService = LabelService;
    this.type="menuItem";
    this.$stateParams=$stateParams;
    this.contextual = contextual;
    this.ItemService = ItemService;
    this.newModifiers = [];

    let inParam = false;
    if (this.item.item && this.item.item.id === Number($stateParams.itemId)){
      inParam = true;
      this.item.$selected = true;
    }
    //if it's a new item we toggle the context menu to edit this
    if (this.item.item && !this.item.item.id || inParam) {
      $timeout(()=>{
        this.contextual.showMenu(this.type, this.item.item, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
      })
    }
  }
}
