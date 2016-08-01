  export default class menuSectionController {
  static get UID(){
    return "menuSectionController";
  }
  onNewModifierMoved($modifiers, $partFrom, $partTo, $indexFrom, $indexTo) {

     if (this.ModifierService.isModifiersDuplicated($modifiers, this.section)){
      return this.Snack.showError("One or more modifiers already in section");
    }

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

  isItemDuplicated(items){
   for (let j=0;j<items.length;j++){
     let found = 0;
      for (let i=0;i<this.section.items.length;i++){
        if (this.section.items[i].id === items[j].id){
          found++;
          // sort list adds the item in the new list, if we find it we must remove it
          if (found){
            return true;
          }
        }
      }
    }
  }

  onNewItemMoved($items, $partFrom, $partTo, $indexFrom, $indexTo) {

     if (this.isItemDuplicated($items)){
        this.Snack.showError('One or more items already in section');
        $partTo.splice($indexTo,$items.length);
        return;
      }

    this.Spinner.show("moving-section-item");
    let promises = [];
    $items.forEach(($item)=>{
        // move new item always to the beggining of new section
        const originalPos = $item.position;
        $item.position = 0;
        if ($item && $item.sectionId != this.section.id){
          $item.menuId = this.section.menuId;
          let p = this.section.moveItem($item).then((newItem)=>{
            this.section.items.splice(0,0,this.ItemService.getById(newItem.id))
          }, ()=>{
            //restore item to original position
            $item.position = originalPos;
            $partFrom.splice($indexFrom,0,$item);
            this.Snack.showError("Error moving items to section")
          })
          promises.push(p);
        } else {
          $partFrom.push($item);
          return this.$q.resolve()
        }
    })
    this.$q.all(promises).then(()=>{
      this.Snack.show("Items moved to section")
      this.Spinner.hide("moving-section-item");
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
    this.contextual.showMenu(this.type,this.section, this.handleSuccess.bind(this), this.handleCancel.bind(this));
    this.section.$expanded = false;
  }
  onDelete(){
    this.DialogService.delete(this.LabelService.TITLE_DELETE_SECTION, this.LabelService.CONTENT_DELETE_SECTION)
      .then(()=>{
        this.menuSectionListCtrl.deleteSection(this.section)
      })
  }

  onVisibility(newStatus){
    this.section.visible = newStatus ? 1 : 0;
    this.saveSection();
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

      if (!this.section.id){
        this.Spinner.show("section-create");
        Preoday.Section.save(this.section)
        .then((section)=>{
            this.section.$deleted = true;
            this.$timeout(()=>{
              this.cardItemList.onItemCreated(section);
              this.contextualMenu.hide();
              this.Spinner.hide("section-create");
              this.Snack.show('Section created');
            })
          }, ()=>{
            this.Snack.showError('Error saving section');
          })

      } else {
        this.saveSection().then(()=>{
          this.contextualMenu.hide();
          this.section.$selected = false;
        })
      }
    }
  }

  constructor($rootScope, $q, BroadcastEvents, DialogService, Snack, $stateParams, LabelService, Spinner, $timeout, contextualMenu, contextual, ItemService, ModifierService) {
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
    this.type = 'menuSection'; //type for contextual menu
    this.menuItemType = 'menuItem';
    this.allowedDropTypes = [this.menuItemType];
    this.newItems = [];
    this.newModifiers = [];
    if (this.section && $stateParams.sectionId && this.section.id === Number($stateParams.sectionId)){
      $timeout(()=>{
        this.section.$expanded=true;
      })
    }
    //if it's a new section we toggle the context menu to edit this
    if (this.section && !this.section.id) {
        console.log("here ho");
        this.contextual.showMenu(this.type,this.section, this.handleSuccess.bind(this), this.handleCancel.bind(this));
    }
  }
}
