
export default class menuController {
  static get UID(){
    return "menuController";
  }

  toggleDrawer(id){
    this.contextual.showDrawer(id);
  }


  showSpinner(){
    this.Spinner.show("menu");
  }

  hideSpinner(){
    this.Spinner.hide("menu");
  }

  setMenu(menuId){

    console.log('setting menu', menuId);
    Preoday.Menu.get(menuId)
      .then(this.handleFinishLoading.bind(this))
      .catch((err)=>{
        this.hideSpinner();
        console.log("err",err)
      });
  }


  handleFinishLoading(dataMenu){

    this.menu = dataMenu;
    this.MenuService.setCurrentMenu(this.menu);
    this.hideSpinner();
  }


  constructor($stateParams, $timeout,Spinner, contextual, ItemService, MenuService) {
    "ngInject";
    this.Spinner = Spinner;
    this.showSpinner();
    this.ItemService = ItemService;
    this.MenuService = MenuService;
    this.$timeout = $timeout;
    this.contextual = contextual;

    ItemService.getItems($stateParams.venueId).then(()=>{
      this.setMenu($stateParams.menuId);
    });
  }
}

