  export default class menuSectionController {
  static get UID(){
    return "menuSectionController";
  }
  onNewModifierMoved($modifiers, $partFrom, $partTo, $indexFrom, $indexTo) {

     if (this.ModifierService.isModifiersDuplicated($modifiers, this.section)){
      return this.Snack.showError("One or more modifiers already in section");
    }

    if (this.items && this.items.length) {
      if (this.hasItemWithTheseModifiers($modifiers)) {
        return this.showSameItemModifierDialog($modifiers);
      }
    }

    return this.doAddModifier($modifiers);
  }

  showSameItemModifierDialog ($modifiers) {

    this.DialogService.show(this.ErrorService.SECTION_ITEM_HAS_MODIFIER.title, this.ErrorService.SECTION_ITEM_HAS_MODIFIER.message, [{
        name: this.gettextCatalog.getString('Add Modifier')
      }], {
        hasCancel: true
      }).then(() => {

        this.doAddModifier($modifiers);
      });
  }

  doAddModifier ($modifiers) {

    this.Spinner.show("moving-section-modifiers");
    let promises = this.ModifierService.addModifiersToParent($modifiers, this.section);

    this.$q.all(promises).then(()=>{
      this.Snack.show("Added modifiers to section");
    },()=>{
      this.Snack.showError("Error adding modifiers to section");
    })
    .then(()=>{
      this.Spinner.hide("moving-section-modifiers");
    })
  }

  hasItemWithTheseModifiers ($modifiers) {

    return this.items.filter((item) => {

      return this.ModifierService.isModifiersDuplicated($modifiers, item);
    }).length > 0;
  }

  isItemDuplicated(items){
   for (let j=0;j<items.length;j++){
     let found = 0;
      for (let i=0;i<this.items.length;i++){
        if (this.items[i].id === items[j].id){
          found++;
          // sort list adds the item in the new list, if we find it we must remove it
          if (found){
            return true;
          }
        }
      }
    }
  }

  // This is called when you moved an item to this section
  onNewItemMoved($items, $partFrom, $partTo, $indexFrom, $indexTo, $removeFromOrigin) {

     if (this.isItemDuplicated($items)){
        this.Snack.showError('One or more items already in section');
        // $partTo.splice($indexTo,$items.length);
        return;
      }

    this.Spinner.show("moving-section-item");
    let promises = [];

    $items.forEach(($item)=>{
        // move new item always to the beggining of new section
        var copy = angular.copy($item)
        copy.position = 0;
        if ($item && $item.sectionId != this.section.id){
          copy.menuId = this.section.menuId;
          copy.sectionId = $item.sectionId;

          let p = this.section.moveItem(copy).then((newItem)=>{

            newItem.position = 0;
            if (this.items.length) {
              this.items[0].position += 1;
            }
            this.items.unshift(newItem);
          }).catch((err)=>{

            this.Snack.showError("Error moving items to section")
            console.log("Error moving items to section", err);
          })
          promises.push(p);
        } else {
          $partFrom.push($item);
          return this.$q.resolve()
        }
    })
    this.$q.all(promises).then(()=>{
      $removeFromOrigin && $removeFromOrigin();

      this.updateItemsPosition()
        .then(() => {

          this.Snack.show("Items moved to section")
          this.Spinner.hide("moving-section-item");
        }, () => {

          this.Snack.show("Items moved to section")
          this.Spinner.hide("moving-section-item");
        });
    })

  }

  saveSection(){
    this.Spinner.show("section-save");
    return this.$q((resolve, reject)=>{
      this.section.update()
        .then((s)=>{
          this.Snack.show('Section updated');
          resolve(s);
      },()=>{
        reject();
        this.Snack.showError('Error saving section');
      }).then(()=>{
        this.Spinner.hide("section-save");
      })

      console.log("resolved");
    });
  }

  updateItemsPosition() {

    const promises = [];
    this.items.forEach((item, index)=>{
      let clone = angular.copy(item);
      clone.position=index*1000;
      promises.push(clone.update());
    });
    return this.$q.all(promises);
  }


  toggleExpanded($event){

    if (this.section.$expanding){
      return;
    }
    if ($event){
      var el = angular.element($event.target);
      while (el[0]) {
        el = angular.element(el);
        if (el.hasClass('sv-long-pressing')){
          return;
        }
        el = el.parent();
      }
    }

    this.cardItemList.expandItem(this.section);
    this.contextualMenu.close();
  }


  onEdit($event){
    this.originalSection = angular.copy(this.section);
    this.cardItemList.selectItem(this.section);
    this.contextual.showMenu(this.type,this.section, this.handleSuccess.bind(this), this.handleCancel.bind(this), {
      tags: this.menuSectionListCtrl.tags
    });
    this.section.$expanded = false;
  }
  onDelete(){
    this.DialogService.delete(this.LabelService.TITLE_DELETE_SECTION, this.LabelService.CONTENT_DELETE_SECTION)
      .then(()=>{
        this.menuSectionListCtrl.deleteSection(this.section)
      })
  }

  restoreOriginalValues(){
    if (this.originalSection){
      this.section.name = this.originalSection.name;
      this.originalSection = false;
    }
  }

  handleCancel(){
    this.restoreOriginalValues();
    this.section.$selected = false;
    if (this.section && !this.section.id) {
      this.cardItemList.deleteItem(this.section);
    }
  }

  handleSuccess(entity){
    if (this.section && entity){
      this.section = entity;

      var menu = this.section.getMenu();
      this.section.collapse = menu ? menu.collapse : 0;

      if (!this.section.id){
        this.Spinner.show("section-create");
        Preoday.Section.save(this.section, menu)
        .then((section) => {

            this.cardItemList.onUpdateItem(this.section, section);
            this.contextualMenu.hide();
            this.Spinner.hide("section-create");
            this.Snack.show('Section created');
          }, () => {

            this.Snack.showError('Error saving section');
          });

      } else {
        this.saveSection().then(()=>{
          this.contextualMenu.hide();
          this.section.$selected = false;
        })
      }
    }
  }

  buildItems () {
    console.log("this sec item", this.section.items)
    this.items = this.section.items.map((i) => {

      let item = angular.copy(this.ItemService.getById(i.id));
      item.position = i.position;
      item.sectionId = this.section.id;
      item.menuId = this.section.menuId;

      return item;
    });
  }

  checkUpdatedItem (event, updatedItem) {

    if (updatedItem.sectionId === this.section.id) {
      return;
    }

    let items = this.items.filter((item) => {

      return item.id === updatedItem.id;
    });

    if (items.length) {
      for (let len = items.length; len--;) {
        let current = items[len];

        let newItem = angular.copy(this.ItemService.getById(current.id));
        newItem.position = current.position;
        newItem.sectionId = current.sectionId;
        newItem.menuId = current.menuId;

        this.items.splice(this.items.indexOf(current), 1, newItem);
      }
    }
  }

  constructor($scope, $rootScope, $q, BroadcastEvents, DialogService, Snack, $stateParams, LabelService, Spinner, $timeout, contextualMenu, contextual, ItemService, ModifierService, ErrorService, gettextCatalog) {
    "ngInject";
    this.$q =$q;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.$stateParams = $stateParams;
    this.ModifierService =ModifierService;
    this.ItemService =ItemService;
    this.$timeout = $timeout;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.ErrorService = ErrorService;
    this.gettextCatalog = gettextCatalog;

    this.type = 'menuSection'; //type for contextual menu
    this.menuItemType = 'menuItem';
    this.allowedDropTypes = [this.menuItemType];
    this.items = [];
    this.newItems = [];
    this.newModifiers = [];
    if (this.section && $stateParams.sectionId && this.section.id === Number($stateParams.sectionId)){
      $timeout(()=>{
        this.section.$expanded=true;
      })
    }
    //if it's a new section we toggle the context menu to edit this
    $timeout(() => {
      if (!this.section.id) {
        this.contextual.showMenu(this.type,this.section, this.handleSuccess.bind(this), this.handleCancel.bind(this), {
          tags: this.menuSectionListCtrl.tags
        });
      } else {
        this.buildItems();

        $scope.$on(BroadcastEvents.ON_ITEM_UPDATED, this.checkUpdatedItem.bind(this));
      }
    });
  }
}
