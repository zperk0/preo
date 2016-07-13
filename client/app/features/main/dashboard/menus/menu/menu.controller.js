
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


  constructor($stateParams, $timeout,Spinner, contextual) {
    "ngInject";
    this.Spinner = Spinner;
    this.showSpinner();
    this.setMenu($stateParams.menuId);
    this.$timeout = $timeout;
    this.contextual = contextual;
    //types for drag and drop list
  }
}
