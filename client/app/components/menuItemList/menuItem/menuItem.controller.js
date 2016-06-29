export default class menuItemController {
  static get UID(){
    return "menuItemController";
  }

  saveItem(newItem = false){
    if (!newItem){
      newItem=this.item;
    }
    const that = this;
    this.Spinner.show("item-save");
    return this.$q((resolve, reject)=>{
      newItem.update()
        .then(()=>{
          // images and tags are not returned in the request
          newItem.images = that.item.images;
          newItem.tags = that.item.tags;
          that.item = newItem;
          if (that.item.$image){
            return Preoday.ItemImage.saveToCdn(that.item.$image, that.item.id, that.$stateParams.venueId)
          }
        })
        .then((itemImage)=>{
          if (itemImage) {
            if (that.item.images && that.item.images.length){
              console.log("updating", itemImage, that.item.images[0])
              that.item.images[0].image = itemImage.image;
              return that.item.images[0].update();
            } else {
              return Preoday.ItemImage.save(itemImage);
            }
          }
        })
        .then(()=>{
            return that.item.updateTags();
        })
        .then(()=>{
          console.log("in then");
          resolve();
          that.Spinner.hide("item-save");
        },(err)=>{
          console.log("rejecting", err)
        })
        .catch(()=>{
          console.log("on catch");
          that.Spinner.hide("item-save");
          reject();
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
        that.saveItem()
          .then(()=>{
            this.Snack.show('Item updated');
          }, ()=>{
            this.Snack.show('Error updating item');
          })
        $event.stopPropagation();
      }
    }
  }

  handleSuccess(entity){
    if (this.item && entity){

      if (entity.id === -1){
        this.item = entity;
        this.menuItemListCtrl.createItem(this.item)
          .then(()=>{
            this.ContextualMenu.hide();
            this.Snack.show('Item created');
          }, ()=>{
            this.Snack.showError('Error saving item');
          })

      } else {
        this.saveItem(entity).then(()=>{
            this.Snack.show('Item updated');
            this.ContextualMenu.hide();
            this.item.$selected = false;
        }, ()=>{
          this.Snack.show('Error updating item');
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


  constructor($q, Snack, DialogService, $stateParams, BroadcastEvents, $rootScope, LabelService, Spinner, $timeout, ContextualMenu) {
    "ngInject";
    this.$q =$q;
    this.Snack = Snack;
    this.ContextualMenu = ContextualMenu;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.type="menuItem";
    this.$stateParams=$stateParams;
    this.setCardActions();

    //if it's a new item we toggle the context menu to edit this
    if (this.item && this.item.id === -1) {
      $timeout(()=>{
        this.ContextualMenu.show(this.type, this.item, this.handleSuccess.bind(this), this.handleCancel.bind(this));
      })
    }
  }
}
