
export default class menuListController {
  static get UID(){
    return "menuListController";
  }

  showSpinner(){
    this.Spinner.show("menu-list");
  }

  hideSpinner(){
    this.Spinner.hide("menu-list");
  }

  setMenus(venueId){
    const noExpand = true;
    Preoday.Menu.get({venueId,noExpand})
    .then(this.handleFinishLoading.bind(this), this.handleError.bind(this,"FAILED_LOADING_MENUS"));
  }

  handleError (error) {
    this.error = this.ErrorService[error];
    this.hideSpinner();
  }

  handleFinishLoading(dataMenus){
    this.menus = dataMenus;
    this.hideSpinner();
    //skip to first menu if we didn't load this page or if we didn't come from inside the menu
    if (dataMenus.length === 1 && this.$rootScope.previousState && this.$rootScope.previousState !== 'main.dashboard.menus.menu'){
      this.$state.go("main.dashboard.menus.menu",{menuId:dataMenus[0].id})
    }
  }


  constructor($stateParams,ErrorService, Spinner, $state, $rootScope) {
    "ngInject";
    this.Spinner = Spinner;
    this.showSpinner();
    this.setMenus($stateParams.venueId);
    this.ErrorService = ErrorService;
    this.$state = $state;
    this.$rootScope = $rootScope;
  }
}
