
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
  }


  constructor($stateParams,ErrorService, Spinner) {
    "ngInject";
    this.Spinner = Spinner;
    this.showSpinner();
    this.setMenus($stateParams.venueId);
    this.ErrorService = ErrorService;


  }
}
