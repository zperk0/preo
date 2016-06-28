
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

  handleFinishLoading(dataMenu){
    if (dataMenu && this.initialExpandedSection){
      dataMenu.sections.forEach((s)=>{
        if (s.id === this.initialExpandedSection){
          this.$timeout(()=>{
            s.$expanded = true;
          },1000)
        }
      })
    }
    this.$timeout(()=>{
      this.menu = dataMenu;
      console.log("this menu", this.menu)
      this.hideSpinner();
    });
  }


  constructor($stateParams, $timeout, $rootScope, Spinner) {
    "ngInject";
    console.log("state", $stateParams.menuId);
    this.Spinner = Spinner;
    this.showSpinner();
    this.setMenu($stateParams.menuId);
    this.initialExpandedSection = $stateParams.sectionId && Number($stateParams.sectionId);
    this.$timeout = $timeout;
    this.showingContextualMenu = false;
    //types for drag and drop list
    this.menuSectionType = 'menuSection';
    this.allowedDropTypes = [this.menuSectionType];
    this.$rootScope = $rootScope;
  }
}
