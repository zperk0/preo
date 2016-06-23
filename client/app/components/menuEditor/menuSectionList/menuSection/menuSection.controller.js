  export default class menuSectionController {
  static get UID(){
    return "menuSectionController";
  }

  clearPossibleNewItem(){
    // remove item with id -1, (possible new item)
    this.deleteItem({id:-1});
    console.log("deleted -1 item")
  }

  addNewItem(item){
     this.clearPossibleNewItem();
     this.section.items.push(item);
  }

  selectItem(item){
    if (this.section.items){
      this.section.items.forEach((i, index)=>{
        if (item && i.id === item.id){
          i.$selected = true;
        } else{
          i.$selected=false;
        }
      });
    }
  }


  onItemMoved($index){
    //update all sections
    this.section.items.forEach((i, index)=>{
      i.position=index*1000;
      i.update();
    });
  }

  deleteItem(item){
    if (this.section.items){
      this.section.items = this.section.items.filter((i)=>item.id !== i.id);
    }
  }
  showCreateItem($event){
    let newItem = {
        id:-1,
        menuId:this.section.menuId,
        sectionId:this.section.id,
        $selected:true,
        quantity:1,
        $size:0,
        visible:1,
        venueId:this.$stateParams.venueId,
        position:(this.section.items[this.section.items.length-1]).position + 1000
    };
    this.section.items.push(newItem);
    $event.stopPropagation();
  }

  saveSection(){
    this.Spinner.show("section-save");
    return this.$q((resolve, reject)=>{
      this.section.update()
        .then(()=>{
          this.Snack.show('Section updated');
          resolve();
      },()=>{
        reject();
        this.Snack.showError('Error saving section');
      }).then(()=>{
        this.Spinner.hide("section-save");
      })

      console.log("resolved");
    });
  }


  toggleExpanded(){
    this.menuSectionListCtrl.expandSection(this.section);
    this.$stateParams.sectionId = this.section.id;
    this.menuCtrl.closeContextualMenu();
    this.selectItem();
  }

  //sets action callbacks for <card-item-actions>
  setCardActions(){
    const that = this;
    this.cardItemActions={
      onClone: ($event) => {
        that.menuSectionListCtrl.cloneSection(this.section); //will create a new section with this section as data
      },
      onEdit: ($event) => {
        console.log("cpp")
        that.originalSection = angular.copy(this.section);
        that.menuSectionListCtrl.selectSection(that.section);
        that.menuCtrl.showContextualMenu(that.section,that.type, that.saveSection.bind(that));
      },
      onDelete: ($event)=>{
        that.DialogService.delete(that.LabelService.TITLE_DELETE_SECTION, that.LabelService.CONTENT_DELETE_SECTION)
          .then(()=>{
            this.menuSectionListCtrl.deleteSection(this.section)
          })
        $event.stopPropagation();
      },
      onVisibility:(newStatus, $event)=>{
        that.section.visible = newStatus ? 1 : 0;
        that.saveSection();
        $event.stopPropagation();
      }
    }
  }

  restoreOriginalValues(){
    if (this.originalSection){
      this.section.name = this.originalSection.name;
      this.originalSection = false;
    }
  }

  handleCloseContextualMenuCancel(event, entity, type){
    this.restoreOriginalValues();
    this.section.$selected = false;
    this.selectItem();
    this.clearPossibleNewItem();
  }
  handleCloseContextualMenuSuccess(event, entity, type){
    if (this.section){
      if(entity && type=== this.type && entity.id === this.section.id){
          this.section = entity;
      }
      this.section.$selected = false;
    }
  }

  constructor($rootScope, $q, BroadcastEvents, DialogService, Snack, $stateParams, LabelService, Spinner, $timeout) {
    "ngInject";
    this.$q =$q;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.$stateParams = $stateParams;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.type = 'menuSection'; //type for contextual menu
    this.setCardActions();
    this.menuItemType = 'menuItem';
    this.allowedDropTypes = [this.menuItemType];

    //if it's a new section we toggle the context menu to edit this
    if (this.section && this.section.id === -1) {
      $timeout(()=>{
        this.menuSectionListCtrl.showContextualMenu(this.section,this.type, this.menuSectionListCtrl.bind(this.menuSectionListCtrl));
      })
    }

    this.onSuccessCleanup = $rootScope.$on(BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU_SUCCESS,this.handleCloseContextualMenuSuccess.bind(this));
    this.onCancelCleanup = $rootScope.$on(BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU_CANCEL,this.handleCloseContextualMenuCancel.bind(this));
  }
}
