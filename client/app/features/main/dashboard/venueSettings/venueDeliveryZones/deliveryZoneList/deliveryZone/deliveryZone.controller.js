export default class deliveryZoneController {
  static get UID(){
    return "deliveryZoneController";
  }

  onEdit ($event){
    this.originalItem  = angular.copy(this.deliveryZone);
    this.contextual.showDrawer('deliveryZonesEdit');
  }

  onDelete ($event){
    const msg = this.sectionId ? this.LabelService.CONTENT_DELETE_ITEM_SECTION : this.LabelService.CONTENT_DELETE_ITEM;
      this.DialogService.delete(this.LabelService.TITLE_DELETE_ITEM, msg)
        .then(()=>{
            this.Spinner.show("item-delete");

            let promise = null;

            if (this.sectionId){
              promise = this.deliveryZoneService.removeFromSection(this.deliveryZone, this.sectionId)
            }
            else {
              promise = this.deliveryZoneService.deleteItem(this.deliveryZone)
            }

            promise.then(()=>{
                this.cardItemList.onItemDeleted(this.deliveryZone);
                if (this.onItemDeleted){
                  this.onItemDeleted({item:this.deliveryZone});
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

  onVisibility (newStatus){
    this.toggleVisibility(newStatus)
  }

  toggleVisibility(newStatus){
    let updates = angular.copy(this.deliveryZone);
    updates.visible = newStatus ? 1 : 0;
    this.updateItem(updates, true) //skip extensions
      .then(()=>{
        this.cardItemList.selectItem();
      })
      .catch(()=>{
          this.Snack.showError('Item visibility not changed');
      })
  }



  createItem() {

    this.Spinner.show("item-create")
    this.deliveryZoneService.createItem(this.deliveryZone, this.sectionId)
      .then((createdItem)=>{
        this.cardItemList.onUpdateItem(this.deliveryZone, createdItem);

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




  // This method is to set the updatedItem properties, without replace item relations. Eg: tags, modifiers..
  restoreValues(newValues = false){
    if(newValues){
      this.originalItem = newValues;
    }
    if (this.originalItem){
      for (var property in this.originalItem) {
      if (this.originalItem.hasOwnProperty(property)) {
        this.deliveryZone[property] = this.originalItem[property];
        }
      }
      this.originalItem = false;
    }
  }

  contextualMenuCancel(event, entity, type){
    this.restoreValues()
    this.deliveryZone.$selected = false;
    if (this.deliveryZone && !this.deliveryZone.id) {
      this.deliveryZone.$deleted = true;
      this.cardItemList.deleteItem(this.deliveryZone);
    }
  }
  contextualMenuSuccess(){

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
    this.type = "menuItem";
    this.$stateParams=$stateParams;
    this.contextual = contextual;
    this.deliveryZoneService = ItemService;
    this.newModifiers = [];

    let inParam = false;
    if (this.deliveryZone && this.deliveryZone.id === Number($stateParams.itemId)){
      inParam = true;
      this.deliveryZone.$selected = true;
    }

    if (!this.hasActions && this.hasActions !== false) {
      this.hasActions = true;
    }

    //if it's a new item we toggle the context menu to edit this
    if (this.deliveryZone && (!this.deliveryZone.id || inParam) && this.hasActions) {
      $timeout(()=>{

        // this.contextual.showMenu(this.type, this.deliveryZone, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
      })
    }
  }
}
