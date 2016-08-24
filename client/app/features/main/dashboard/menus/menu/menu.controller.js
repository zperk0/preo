
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

    dataMenu.sections.forEach((s)=>{
      s.$positionedItems = s.items.map((i)=>({id:i.id,sectionId:s.id, position:i.position, item:this.ItemService.getById(i.id)}));
      // let items = this.ItemService.getByIds(s.items.map((i)=>i.id));
    })
    this.menu = dataMenu;
    this.hideSpinner();
  }


  constructor($stateParams, $timeout,Spinner, contextual, ItemService) {
    "ngInject";
    this.Spinner = Spinner;
    this.showSpinner();
    this.ItemService = ItemService;
    this.$timeout = $timeout;
    this.contextual = contextual;
    ItemService.getItems($stateParams.venueId).then(()=>{
      this.setMenu($stateParams.menuId);
    });
  }
}

