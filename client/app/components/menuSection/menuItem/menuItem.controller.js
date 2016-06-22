export default class menuItemController {
  static get UID(){
    return "menuItemController";
  }

  showCreateItem($event){
     if (!this.item || !this.item.id){
      this.item = {
        id:-1,
        menuId:this.menuSectionCtrl.section.menuId,
        sectionId:this.menuSectionCtrl.section.id,
        $selected:true,
        quantity:1,
        venueId:this.$stateParams.venueId,
        position:this.menuSectionCtrl.section.items.length * 1000
      };
    }
    this.menuCtrl.toggleContextualMenu(this.item,this.type, this.createItem.bind(this));
    $event.stopPropagation();
  }

  createItem(newData = false){
    if (newData && this.menuSectionCtrl){
      newData.sectionId= this.menuSectionCtrl.section.id;
      newData.menuId = this.menuSectionCtrl.section.menuId;
      newData.position = this.menuSectionCtrl.section.items.length * 1000;
    }
    return this.$q((resolve, reject)=>{
      this.Spinner.show("item-create");
      Preoday.Item.save(newData || this.item)
        .then((item)=>{
          this.Snack.show('Item created');
          if (this.menuSectionCtrl){
            this.menuSectionCtrl.createItem(item);
          }
          if(!newData){
            delete this.item;
          }
          resolve();
      },(err)=>{
        reject(err);
        this.Snack.showError('Error saving item');
      }).then(()=>{
        this.Spinner.hide("item-create");
      })
    });
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

  deleteItem(isInSection){
    // call Preoday.Item or Preoday.Section method to delete item or remove from section
    this.Spinner.show("item-delete");
    const deleteAction = isInSection ? this.menuSectionCtrl.section.removeItems.bind(this.menuSectionCtrl.section) : this.item.delete.bind(item);
    deleteAction([this.item.id])
      .then(()=>{
        this.Snack.show('Item deleted');
        if (isInSection){
          this.menuSectionCtrl.deleteItem(this.item);
        }
      }, ()=>{
        console.log("error deleting item");
        this.Snack.showError('Error deleting item');
      }).then(()=>{
        this.Spinner.hide("item-delete");
      })
  }

  //sets action callbacks for <card-item-actions>
  setCardActions(){
    const that = this;
    this.cardItemActions={
      onClone: ($event) => {
        const newItemData = angular.copy(that.item);
        that.createItem(newItemData); //will create a new item with this item as data
      },
      onEdit: ($event) => {
        that.menuSectionCtrl.selectItem(that.item);
        that.menuCtrl.toggleContextualMenu(that.item,that.type, that.saveItem.bind(that));
      },
      onDelete: ($event)=>{
        const isInSection = that.menuSectionCtrl ? true : false;
        const msg = isInSection ? that.LabelService.CONTENT_DELETE_ITEM_SECTION : that.LabelService.CONTENT_DELETE_ITEM;
        that.DialogService.delete(that.LabelService.TITLE_DELETE_ITEM, msg)
          .then(()=>{
            that.deleteItem(isInSection);
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


  constructor($q, Snack, DialogService, BroadcastEvents, $rootScope, $stateParams, LabelService, Spinner) {
    "ngInject";
    this.$q =$q;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.type="menuItem";
    this.setCardActions();
    this.$stateParams = $stateParams;


    $rootScope.$on(BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU,(event, entity, type)=>{
      if (this.item){
        if(entity && type=== this.type && entity.id === this.item.id){
          this.item = entity;
        }
      this.item.$selected = false;
      }
    });
  }
}
