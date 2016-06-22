
export default class menuListController {
  static get UID(){
    return "menuListController";
  }

  showMenu(menu){
    this.$state.go("main.dashboard.menus.menu",{menuId:menu.id});
  }

  setMenus(venueId){
    const noExpand = true;
    Preoday.Menu.get({venueId,noExpand})
    .then(this.handleFinishLoading.bind(this), this.handleError.bind(this,"FAILED_LOADING_MENUS"));
  }

  handleError (error) {
    this.error = this.ErrorService[error];
  }

  handleFinishLoading(dataMenus){
    this.menus = dataMenus;
  }


  constructor($state,$stateParams,ErrorService) {
    "ngInject";
    this.$state=$state;
    this.setMenus($stateParams.venueId);
    this.ErrorService = ErrorService;
  }
}
