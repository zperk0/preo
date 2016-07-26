export default class menuCardItemController {
  static get UID(){
    return "menuCardItemController"
  }

  contextualMenuSuccess(updates){
    if (!this.menu.id){
      this.createMenu();
    }
    else {
      this.updateMenu(updates);
    }
    if (!this.item.id){
      this.cardItemList.clearPossibleNewItem();
    }
    //clear selection
    this.cardItemList.selectItem();
  }

  contextualMenuCancel(){
    this.restoreValues()
    this.menu.$selected = false;
    //clear selections
    this.cardItemList.clearPossibleNewItem();
    this.cardItemList.selectItem();
  }

  restoreValues(newValues = false){
    if(newValues){
      this.originalItem = newValues;
    }
    if (this.originalItem){
      for (var property in this.originalItem) {
      if (this.originalItem.hasOwnProperty(property)) {
        this.menu[property] = this.originalItem[property];
        }
      }
      this.originalItem = false;
    }
  }

  onClone ($event){
    this.Spinner.show("menu-clone")
    Preoday.Menu.clone(this.menu.id)
      .then((newMenu)=>{
        this.cardItemList.onItemCreated(newMenu, true);
        if (this.onItemCreated){
          this.onItemCreated({item:newMenu});
        }
        this.Spinner.hide("menu-clone")
        this.Snack.show('Menu created');
        this.contextualMenu.hide();
      }, (err)=>{
        console.log("failed duplicating menu", err)
        this.Spinner.hide("menu-clone")
        this.Snack.showError('Menu duplicated');
      })
      $event.stopPropagation();
  }
  onEdit ($event){
    this.originalItem  = angular.copy(this.menu);
    this.cardItemList.selectItem(this.menu);
    this.contextual.showMenu(this.type, this.menu, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  }

   createMenu(){
    this.Spinner.show("menu-create")
    Preoday.Menu.save(this.menu)
      .then((newMenu)=>{
        this.cardItemList.onItemCreated(newMenu, true);
        if (this.onItemCreated){
          this.onItemCreated({item:newMenu});
        }
        this.Spinner.hide("menu-create")
        this.Snack.show('Menu created');
        this.contextualMenu.hide();
      }, (err)=>{
        console.log("failed creating menu", err)
        this.Spinner.hide("menu-create")
        this.Snack.showError('Menu not created');
      })
  }

  updateMenu(updates){
    this.Spinner.show("menu-updated")
    updates.update()
      .then((updatedMenu)=>{
        this.restoreValues(updatedMenu);
        this.Snack.show('Menu saved');
        this.Spinner.hide("menu-updated")
        this.contextualMenu.hide();
      })
      .catch((err)=>{
        console.log("error", err)
        this.Snack.showError('Menu not saved');
        this.Spinner.hide("menu-updated")
      })
  }

  onDelete ($event){
    this.DialogService.delete(this.LabelService.TITLE_DELETE_MENU, this.LabelService.CONTENT_DELETE_MENU)
      .then(()=>{
          this.Spinner.show("menu-delete");
          return this.menu.delete();
      })
      .then(()=>{
          this.cardItemList.onItemDeleted(this.menu);
          if (this.onItemDeleted){
            this.onItemDeleted({item:this.menu});
          }
          this.Snack.show('Menu deleted');
          this.Spinner.hide("menu-delete");
      })
      .catch((err)=>{
        console.log("Failed deleting menu", err)
        this.Spinner.hide("menu-delete")
        this.Snack.showError('Menu not deleted');
      })
      $event.stopPropagation();
  }

  constructor(LabelService, DialogService, Spinner, contextual, contextualMenu, $stateParams, Snack, $timeout) {
    "ngInject";
    this.DialogService=DialogService;
    this.LabelService=LabelService;
    this.Spinner=Spinner;
    this.$stateParams= $stateParams;
    this.contextual=contextual;
    this.contextualMenu=contextualMenu;
    this.Snack=Snack;
    this.type="menu";

    if (this.menu && !this.menu.id) {
      $timeout(()=>{
        this.contextual.showMenu(this.type, this.menu, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
      })
    }
  }
}
