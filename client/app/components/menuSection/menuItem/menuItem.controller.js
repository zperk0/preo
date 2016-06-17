export default class menuItemController {
  static get UID(){
    return "menuItemController";
  }

  showCreateItem($event){
     if (!this.item || !this.item.id){
      this.item = {
        id:-1,
        menuId:this.menuSectionCtrl.section.menuId,
        sectionid:this.menuSectionCtrl.section.id,
        $selected:true,
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
      },()=>{
          reject();
        this.Snack.showError('Error saving item');
      });
    });
  }


  saveItem(){
    return this.$q((resolve, reject)=>{
      this.item.update()
        .then(()=>{
          this.Snack.show('Item updated');
          resolve();
      },()=>{
        reject();
        this.Snack.showError('Error saving item');
      });
    });
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
        const msg = isInSection ? "Are you sure you want to remove this item from this section?" : "Are you sure you want to permanently delete this item?";

        // call Preoday.Item or Preoday.Section method to delete item or remove from section
        const deleteAction = isInSection ? that.menuSectionCtrl.section.removeItem.bind(that.menuSectionCtrl.section) : that.item.delete.bind(item);
        that.DialogService.delete("Delete item?", msg)
          .then(()=>{
            that.menuSectionCtrl.section.removeItem(this.item.id)
              .then(()=>{
                that.Snack.show('Item deleted');
                if (isInSection){
                  that.menuSectionCtrl.deleteItem(that.item);
                }
              }, ()=>{
                console.log("error deleting item");
                that.Snack.showError('Error deleting item');
              })

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

  /* @ngInject */
  constructor($q, Snack, DialogService, BroadcastEvents, $rootScope) {
    'ngInject';
    this.$q =$q;
    this.Snack = Snack;
    this.DialogService = DialogService;
    this.type="menuItem";
    this.setCardActions();


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
