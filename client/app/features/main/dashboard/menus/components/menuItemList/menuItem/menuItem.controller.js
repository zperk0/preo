export default class menuItemController {
  static get UID(){
    return "menuItemController";
  }

  onNewModifierMoved($modifiers, $partFrom, $partTo, $indexFrom, $indexTo){

    function _doAddModifier(newItem = this.item){
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
    if (this.ModifierService.isModifiersDuplicated($modifiers, this.item)){
      return this.Snack.showError("One or more modifiers already in item");
    }

    return this.checkMultipleOccurrences(this.item)
    .then((updateAction)=>{
      if (updateAction === 'all'){
        return _doAddModifier.call(this);
      } else {
        let clonePosition = this.menuSectionItemList.getPosition(this.item);
        return this.ItemService.doSingleEdit(this.item, this.sectionId, clonePosition)
          .then(_doAddModifier.bind(this))
          .then((newItem)=>{
            this.cardItemList.onItemDeleted(this.item)
            if (this.onItemDeleted){
              this.onItemDeleted({item:this.item});
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
    
    this.originalItem  = angular.copy(this.item);
    this.cardItemList.selectItem(this.item);
    this.contextual.showMenu(this.type, this.item, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this), {
      onDeleteImage: this.onDeleteImage.bind(this)
    });
  }

  onDeleteImage (image) {

    console.log('on delete image here', image);
    this.DialogService.delete(this.LabelService.TITLE_DELETE_ITEM_IMAGE, this.LabelService.CONTENT_DELETE_ITEM_IMAGE)
      .then(()=> {
        this.Spinner.show("item-image-delete");

        image.delete().then(()=>{
          let imageIndex = this.item.images.indexOf(image);
          this.item.images.splice(imageIndex, 1);
          this.originalItem.images.splice(imageIndex, 1);
          this.Snack.show('Image deleted');
          this.Spinner.hide("item-image-delete");
        })
        .catch((err)=>{
          console.log("Failed deleting item image", err)
          this.Spinner.hide("item-image-delete")
          this.Snack.showError('Image not deleted');
        })          
      });    
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
        this.cardItemList.selectItem();
      })
      .catch(()=>{
          this.Snack.showError('Item visibility not changed');
      })
  }

  cloneItem(){

    this.onClone && this.onClone({
      item: this.item,
      sectionId: this.sectionId
    });

    return;

    // this.Spinner.show("item-clone")
    // let clonePosition = this.menuItemListCtrl.getPosition(this.item);
    // this.ItemService.cloneItem(this.item, this.sectionId, clonePosition)
    //   .then((createdItem)=>{
    //     createdItem.$show = true; //need show for animation
    //     this.Spinner.hide("item-clone")
    //     this.Snack.show('Item duplicated');
    //     console.log("cloned", createdItem, this.item);
    //     this.cardItemList.onItemCreated(createdItem);
    //     if (this.onItemCreated){
    //       this.onItemCreated({item:createdItem});
    //     }
    //   }, (err)=>{
    //     console.log("failed creating item", err)
    //     this.Spinner.hide("item-clone")
    //     this.Snack.showError('Failed duplicating item');
    // })
  }


  createItem(){
    this.Spinner.show("item-create")
    this.ItemService.createItem(this.item, this.sectionId)
      .then((createdItem)=>{
        this.cardItemList.onUpdateItem(this.item, createdItem);

        this.contextualMenu.hide();
        if (this.onItemCreated){
          this.onItemCreated({item: createdItem});
        }
        this.Spinner.hide("item-create")
        this.Snack.show('Item created');
      }, (err)=>{
        console.log("failed creating item", err)
        this.Spinner.hide("item-create")
        this.Snack.showError('Failed creating item');
      })
      .catch((err) => {

        console.log('catch here', err);
      });
  }


  //
  // @param(skipExtensions) - skip update item relations. Update only item model
  //
  updateItem(updates, skipExtensions = false){
    return this.checkMultipleOccurrences(updates)
    .then((updateAction)=>{
      this.Spinner.show("item-updated")
      if (updateAction === 'all') {
        return this.ItemService.updateItem(updates, skipExtensions)
          .then((updatedItem)=>{
            this.restoreValues(updatedItem);
          })
      }
      let clonePosition = this.menuSectionItemList.getPosition(this.item);
      return this.ItemService.doSingleEdit(updates, this.sectionId, clonePosition)
        .then((newItem)=> {
          this.cardItemList.onUpdateItem(this.item, newItem);
          if (this.onItemCreated){
            this.onItemCreated({item:newItem});
          }
        })
    })
    .then(()=>{
        this.Spinner.hide("item-updated")
        this.Snack.show('Item updated');
        this.contextualMenu.hide();
        this.cardItemList.onItemUpdated(this.item);
        if (this.onItemUpdated){
          this.onItemUpdated(this.item);
        }
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

  // This method is to set the updatedItem properties, without replace item relations. Eg: tags, modifiers..
  restoreValues(newValues = false){
    if(newValues){
      this.originalItem = newValues;
    }
    if (this.originalItem){
      for (var property in this.originalItem) {
      if (this.originalItem.hasOwnProperty(property)) {
        this.item[property] = this.originalItem[property];
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
      this.cardItemList.deleteItem(this.item);
    }
  }

  deleteItem(){
    const msg = this.sectionId ? this.LabelService.CONTENT_DELETE_ITEM_SECTION : this.LabelService.CONTENT_DELETE_ITEM;
    this.DialogService.delete(this.LabelService.TITLE_DELETE_ITEM, msg)
      .then(()=>{
          this.Spinner.show("item-delete");

          let promise = null;

          if (this.sectionId){
            promise = this.ItemService.removeFromSection(this.item, this.sectionId)
          }
          else {
            promise = this.ItemService.deleteItem(this.item)
          }

          promise.then(()=>{
              this.cardItemList.onItemDeleted(this.item);
              if (this.onItemDeleted){
                this.onItemDeleted({item:this.item});
              }
              this.Snack.show('Item deleted');
              this.Spinner.hide("item-delete");
          })
          .catch((err)=>{
            console.log("Failed deleting item", err)
            this.Spinner.hide("item-delete")
            this.Snack.showError('Item not deleted');
          })          
      });
  }

  //check if we have multiple occurrences before updating but only if we're in a section
  checkMultipleOccurrences(updates){
    if (this.sectionId){
      return this.ItemService.checkMultipleOccurrences(updates || this.item)
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
    if (this.item && this.item.id === Number($stateParams.itemId)){
      inParam = true;
      this.item.$selected = true;
    }

    if (!this.hasActions && this.hasActions !== false) {
      this.hasActions = true;
    }

    //if it's a new item we toggle the context menu to edit this
    if (this.item && (!this.item.id || inParam) && this.hasActions) {
      $timeout(()=>{
        // console.log('sending this item', this.item, inParam, this.hasActions);
        this.contextual.showMenu(this.type, this.item, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this), {
          onDeleteImage: this.onDeleteImage.bind(this)
        });
      })
    }
  }
}
