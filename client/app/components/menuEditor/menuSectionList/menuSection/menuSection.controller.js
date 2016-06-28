  export default class menuSectionController {
  static get UID(){
    return "menuSectionController";
  }

  onNewItemMoved($item, $partFrom, $partTo, $indexFrom, $indexTo) {
    // move new item always to the beggining of new section
    const originalPos = $item.position;
    $item.position = 0;
    if ($item){
      this.section.moveItem($item).then((newItem)=>{
        this.Snack.show("Item moved to section")
        this.section.items.splice(0,0,newItem)
      }, ()=>{
        //restore item to original position
        $item.position = originalPos;
        $partFrom.splice($indexFrom,0,$item);
        this.Snack.showError("Error moving item to section")
      })
    }
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


  toggleExpanded(){
    this.menuSectionListCtrl.expandSection(this.section);
    this.$stateParams.sectionId = this.section.id;
    this.ContextualMenu.close();
  }

  //sets action callbacks for <card-item-actions>
  setCardActions(){
    const that = this;
    this.cardItemActions={
      onClone: ($event) => {
         //will create a new section with this section as data
        this.menuSectionListCtrl.cloneSection(this.section).then(()=>{
            this.Snack.show('Section duplicated');
          }, ()=>{
            this.Snack.showError('Error duplicating section');
          })
      },
      onEdit: ($event) => {
        this.originalSection = angular.copy(this.section);
        this.menuSectionListCtrl.selectSection(this.section);
        this.ContextualMenu.show(this.type,this.section, this.handleSuccess.bind(this), this.handleCancel.bind(this));
        this.section.$expanded = false;
      },
      onDelete: ($event)=>{
        this.DialogService.delete(this.LabelService.TITLE_DELETE_SECTION, this.LabelService.CONTENT_DELETE_SECTION)
          .then(()=>{
            this.menuSectionListCtrl.deleteSection(this.section)
          })
        $event.stopPropagation();
      },
      onVisibility:(newStatus, $event)=>{
        this.section.visible = newStatus ? 1 : 0;
        this.saveSection();
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

  handleCancel(){
    this.restoreOriginalValues();
    this.section.$selected = false;
    if (this.section.id === -1){
      this.menuSectionListCtrl.clearPossibleNewSection();
    }
  }

  handleSuccess(entity){
    if (this.section && entity){
      this.section = entity;

      if (this.section.id === -1){
        this.menuSectionListCtrl.createSection(this.section)
          .then(()=>{
            this.ContextualMenu.hide();
            this.Snack.show('Section created');
          }, ()=>{
            this.Snack.showError('Error saving section');
          })

      } else {
        this.saveSection().then(()=>{
          this.ContextualMenu.hide();
          this.section.$selected = false;
        })
      }
    }
  }

  constructor($rootScope, $q, BroadcastEvents, DialogService, Snack, $stateParams, LabelService, Spinner, $timeout, ContextualMenu) {
    "ngInject";
    this.$q =$q;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ContextualMenu = ContextualMenu;
    this.type = 'menuSection'; //type for contextual menu
    this.setCardActions();
    this.menuItemType = 'menuItem';
    this.allowedDropTypes = [this.menuItemType];
    this.newItems = [];

    //if it's a new section we toggle the context menu to edit this
    if (this.section && this.section.id === -1) {
        console.log("here ho");
        this.ContextualMenu.show(this.type,this.section, this.handleSuccess.bind(this), this.handleCancel.bind(this));
    }
  }
}
