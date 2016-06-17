
export default class menuController {
  static get UID(){
    return "menuController";
  }

  //this library copies the object but doesn't keep the type, we still need the prototype methods
  onSectionMoved($index){
    let originalSection = this.menu.sections[$index];
    let sectionNewIndex = -1;

    //find the new section index by comparing ids, first match with a different $index is the new position of the section
    this.menu.sections.forEach((s,index)=>{
      if (sectionNewIndex === -1 && s.id === originalSection.id && index !== $index){
        sectionNewIndex = index;
      }
    })

    // Remove Section from array to be repositioned
    this.menu.sections.splice($index, 1);

    // we changed the array, if the Object is after the Section, we just changed the index of the section by one, removing one fixes that
    if (sectionNewIndex > $index){
      sectionNewIndex-=1;
    }

    // Remove Object created by library and position section in it's place
    this.menu.sections.splice(sectionNewIndex, 1, originalSection);

    //update all sections
    this.menu.sections.forEach((s, index)=>{
      s.position=index*1000;
      s.update();
    });
  }

  toggleContextualMenu(entity, type, onSubmit, onCancel){
    if (entity){
      this.showingContextualMenu = type;
      this.contextualEntity = entity;
      this.contextualSubmit = onSubmit;
      this.contextualCancel = onCancel;
    } else {
      delete this.showingContextualMenu;
      delete this.contextualEntity;
      delete this.contextualSubmit;
      delete this.contextualCancel;
    }
  }

  createSection(newSection){
    this.menu.sections.push(newSection);
  }

  deleteSection(section){
    this.menu.sections = this.menu.sections.filter((s)=>section.id !== s.id);
  }

  selectSection(section){
    console.log("selecting section", section, this.menu.sections)
    this.menu.sections.forEach((s, index)=>{
      if (s.id === section.id){
        s.$selected = true;
        console.log("selected", s);
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
    });
  }


  /* @ngInject */
  constructor($stateParams, $timeout, DialogService, $mdToast, $rootScope, BroadcastEvents, Snack) {
    'ngInject';
    console.log("state", $stateParams.menuId);
    this.DialogService = DialogService;
    this.Snack = Snack;
    this.$mdToast = $mdToast;
    this.setMenu($stateParams.menuId);
    this.initialExpandedSection = $stateParams.sectionId && Number($stateParams.sectionId);
    this.$timeout = $timeout;
    this.showingContextualMenu = false;
    $rootScope.$on(BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU,()=>{
      this.toggleContextualMenu();
    })
  }
}
