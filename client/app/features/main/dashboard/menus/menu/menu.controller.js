
export default class menuController {
  static get UID(){
    return "menuController";
  }

  showSpinner(){
    this.Spinner.show("menu");
  }

  hideSpinner(){
    this.Spinner.hide("menu");
  }

  onSectionMoveStart(){
    console.log("start arguments", arguments);
  }
  onSectionMoveStop($item, $part, $index){
    console.log("stop arguments", console.log($index, $part[$index]));
    return false;
  }

  onSectionMoved($item, $partFrom, $partTo, $indexFrom, $indexTo){
    //update all sections
    console.log("on section moved, updating");
    this.menu.sections.forEach((s, index)=>{
      s.position=index*1000;
      s.update();
    });
  }

  showContextualMenu(entity, type, onSubmit, onCancel){
    this.showingContextualMenu = type;
    this.contextualEntity = entity;
    this.contextualSubmit = onSubmit;
    this.contextualCancel = onCancel;
  }

  closeContextualMenu(isSuccess){
      delete this.showingContextualMenu;
      delete this.contextualEntity;
      delete this.contextualSubmit;
      delete this.contextualCancel;
      this.selectSection();
      if (!isSuccess){
        this.clearPossibleNewSection();
      }
  }

  clearPossibleNewSection(){
    // remove section with id -1, (possible new section)
    this.deleteSection({id:-1});
    console.log("deleted -1 section")
  }

  addNewSection(section){
     this.clearPossibleNewSection();
     this.menu.sections.push(section);
  }

  showCreateSection($event){
    let section = {
      id:-1,
      menuId:this.menu.id,
      $selected:true,
      visible:1,
      position:(this.menu.sections[this.menu.sections.length-1]).position + 1000
    };
    this.menu.sections.push(section);
    $event.stopPropagation();
  }

  deleteSection(section){
    this.menu.sections = this.menu.sections.filter((s)=>section.id !== s.id);
  }

  selectSection(section){
    this.clearPossibleNewSection();
    this.menu.sections.forEach((s, index)=>{
      if (section && s.id === section.id){
        s.$selected = true;
      } else{
        s.$selected=false;
      }
    });
  }

  duplicateSection(section){
    console.log("duplicating section", section, this);
    //TODO duplicate section
  }

  setMenu(menuId){
    console.log("set menu", menuId);
    Preoday.Menu.get(menuId)
      .then(this.handleFinishLoading.bind(this), this.handleError.bind(this,"FAILED_LOADING_MENU"))
      .catch((err)=>console.log("err",err));
  }

  handleError (error) {
    console.log("got error", error);
    this.error = this.ErrorService[error];
    this.hideSpinner();
  }

  expandSection(section){
    this.menu.sections.forEach((s)=>{
      if (s.id === section.id){
        s.$expanded = !s.$expanded;
      } else {
        s.$expanded = false;
      }

    });
  }

  handleFinishLoading(dataMenu){
    if (dataMenu && this.initialExpandedSection){
      console.log("in here", this.initialExpandedSection)
      dataMenu.sections.forEach((s)=>{
        if (s.id === this.initialExpandedSection){
          s.$expanded = true;
          console.log("epxanded", s);
        }
      })
    }
    this.$timeout(()=>{
      this.menu = dataMenu;
      this.hideSpinner();
    });
  }



  constructor($stateParams, $timeout, DialogService, $mdToast, $rootScope, BroadcastEvents, Snack, Spinner) {
    "ngInject";
    console.log("state", $stateParams.menuId);
    this.DialogService = DialogService;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.showSpinner();
    this.$mdToast = $mdToast;
    this.setMenu($stateParams.menuId);
    this.initialExpandedSection = $stateParams.sectionId && Number($stateParams.sectionId);
    this.$timeout = $timeout;
    this.showingContextualMenu = false;
    //types for drag and drop list
    this.menuSectionType = 'menuSection';
    this.allowedDropTypes = [this.menuSectionType];
    this.$rootScope = $rootScope;
    this.BroadcastEvents = BroadcastEvents;
    $rootScope.$on(BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU_SUCCESS, this.closeContextualMenu.bind(this, true))
    $rootScope.$on(BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU_CANCEL, this.closeContextualMenu.bind(this,false))
  }
}
