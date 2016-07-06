export default class menuItemController {
  static get UID(){
    return "menuItemController";
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
        that.contextual.showMenu(that.type, that.item, that.handleSuccess.bind(that), that.handleCancel.bind(that));
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
        that.menuItemListCtrl.saveItem(that.item)
          .then(()=>{
            this.Snack.show('Item updated');
          }, ()=>{
            this.Snack.showError('Error updating item');
          })
        $event.stopPropagation();
      }
    }
  }

  handleSuccess(entity){
    if (this.item && entity){

      if (!entity.id){
        this.item = entity;
        this.menuItemListCtrl.createItem(this.item)
          .then(()=>{
            this.contextualMenu.hide();
            this.Snack.show('Item created');
          }, ()=>{
            this.Snack.showError('Error saving item');
          })

      } else {

        this.menuItemListCtrl.saveItem(entity).then((item)=>{
            this.Snack.show('Item updated');
            this.contextualMenu.hide();
            this.item = item;
            this.item.$selected = false;
        }, ()=>{
          this.Snack.showError('Error updating item');
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
    if (!this.item.id){
      this.menuItemListCtrl.clearPossibleNewItem();
    }
  }


  constructor($q, Snack, DialogService, $stateParams, BroadcastEvents, $rootScope, LabelService, Spinner, $timeout, contextual, contextualMenu) {
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
    let inParam = false;
    if (this.item.id === Number($stateParams.itemId)){
      inParam = true;
      this.item.$selected = true;
    }
    //if it's a new item we toggle the context menu to edit this
    if (this.item && !this.item.id || inParam) {
      $timeout(()=>{
        this.contextual.showMenu(this.type, this.item, this.handleSuccess.bind(this), this.handleCancel.bind(this));
      })
    }
  }
}
