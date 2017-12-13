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
  }

  contextualMenuCancel(){
    this.restoreValues()
    this.menu.$selected =false;
    if (this.menu && !this.menu.id){
      this.cardItemList.deleteItem(this.menu);
    }
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
        this.Snack.show(this.gettextCatalog.getString('Menu created'));
        this.contextualMenu.hide();
      }, (err)=>{
        console.log("failed duplicating menu", err)
        this.Spinner.hide("menu-clone")
        this.Snack.showError(this.gettextCatalog.getString('Menu duplicated'));
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
        this.Snack.show(this.gettextCatalog.getString('Menu created'));
        this.contextualMenu.hide();
      }, (err)=>{
        console.log("failed creating menu", err)
        this.Spinner.hide("menu-create")
        this.Snack.showError(this.gettextCatalog.getString('Menu not created'));
      })
  }

  updateMenu(updates){
    this.Spinner.show("menu-updated")
    updates.update()
      .then((updatedMenu)=>{
        this.restoreValues(updatedMenu);
        this.menu.$selected =false;
        this.Snack.show(this.gettextCatalog.getString('Menu saved'));
        this.Spinner.hide("menu-updated")
        this.contextualMenu.hide();
      })
      .catch((err)=>{
        console.log("error", err)
        this.Snack.showError(this.gettextCatalog.getString('Menu not saved'));
        this.Spinner.hide("menu-updated")
      })
  }

  onDelete ($event){
    this.DialogService.delete(this.LabelService.TITLE_DELETE_MENU, this.LabelService.CONTENT_DELETE_MENU)
      .then(()=>{
          this.Spinner.show("menu-delete");

          let promise = this.menu.delete();

          promise.then(()=>{
              this.cardItemList.onItemDeleted(this.menu);
              if (this.onItemDeleted){
                this.onItemDeleted({item:this.menu});
              }
              this.Snack.show(this.gettextCatalog.getString('Menu deleted'));
              this.Spinner.hide("menu-delete");
          })
          .catch((err)=>{
            this.Spinner.hide("menu-delete")

            if (err && err instanceof Object && err.message.indexOf('outlet') !== -1) {
              this.Snack.showError(this.gettextCatalog.getString('An outlet is using this menu. You need remove it before'));
            } else {
              this.Snack.showError(this.gettextCatalog.getString('Menu not deleted'));
            }
          });
      });
      $event.stopPropagation();
  }

  constructor($scope, LabelService, DialogService, Spinner, contextual, contextualMenu, $stateParams, Snack, $timeout, gettextCatalog) {
    "ngInject";
    this.DialogService=DialogService;
    this.LabelService=LabelService;
    this.Spinner=Spinner;
    this.$stateParams= $stateParams;
    this.contextual=contextual;
    this.contextualMenu=contextualMenu;
    this.Snack=Snack;
    this.gettextCatalog = gettextCatalog;
    this.type="menu";

    if (this.menu && !this.menu.id) {
      $timeout(()=>{
        this.contextual.showMenu(this.type, this.menu, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
      })
    }

    $scope.$on('$destroy', () => {

      this.contextualMenuCancel();
    })
  }
}
