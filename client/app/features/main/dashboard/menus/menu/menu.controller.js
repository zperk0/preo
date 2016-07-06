
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
    Preoday.Menu.get(menuId)
      .then(this.handleFinishLoading.bind(this))
      .catch((err)=>{
        this.hideSpinner();
        console.log("err",err)
      });
  }


  handleFinishLoading(dataMenu){
    this.$timeout(()=>{
      this.menu = dataMenu;
      console.log("this menu", this.menu)
      this.hideSpinner();
    });
  }


  constructor($stateParams, $timeout, $rootScope, Spinner) {
    "ngInject";
    console.log("state", $stateParams.menuId, this.menu && this.menu.id);
    this.Spinner = Spinner;
    this.showSpinner();
    console.log("state", $stateParams);
    this.setMenu($stateParams.menuId);
    this.$timeout = $timeout;
    this.showingContextualMenu = false;
    //types for drag and drop list
    this.menuSectionType = 'menuSection';
    this.allowedDropTypes = [this.menuSectionType];
    this.$rootScope = $rootScope;
  }
}
