
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

    this.MenuService.getMenus({
      venueId: venueId
    }).then(this.handleFinishLoading.bind(this), this.handleError.bind(this,"FAILED_LOADING_MENUS"));
  }

  handleError (error) {
    this.error = this.ErrorService[error];
    this.hideSpinner();
  }

  handleFinishLoading(data){
    //skip to first menu if we didn't load this page or if we didn't come from inside the menu
    if (data.menus.length === 1 && this.$rootScope.previousState && this.$rootScope.previousState !== 'main.dashboard.menus.menu'){
      this.$state.go("main.dashboard.menus.menu",{menuId: data.menus[0].id})
    } else {
      this.data = data;
    }
    this.hideSpinner();
  }


  constructor($stateParams,ErrorService, Spinner, $state, $rootScope, MenuService) {
    "ngInject";
    this.Spinner = Spinner;
    this.ErrorService = ErrorService;
    this.MenuService = MenuService;
    this.$state = $state;
    this.$rootScope = $rootScope;

    this.showSpinner();
    this.setMenus($stateParams.venueId);    
  }
}
